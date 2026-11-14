// ======================================
// Grupo JM — CATÁLOGO DE RELOJES
// ======================================

const WHATSAPP = "573118261427";

// Conexión segura con Supabase
let db = null;

if (
    typeof supabase !== "undefined" &&
    typeof SUPABASE_URL !== "undefined" &&
    typeof SUPABASE_KEY !== "undefined"
) {
    db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// ======================================
// COLECCIONES
// ======================================

const colecciones = {
    rolex: {
        nombre: "Rolex",
        productos: []
    },

    patek: {
        nombre: "Patek Philippe",
        productos: []
    },

    casio: {
        nombre: "Casio",
        productos: []
    },

    ofertas: {
        nombre: "Ofertas",
        productos: []
    },

    AP: {
        nombre: "AP",
        productos: []
    },

    Cartier: {
        nombre: "Cartier",
        productos: []
    },

    Invicta: {
        nombre: "Invicta",
        productos: []
    },

    QYQ: {
        nombre: "Q&Q",
        productos: []
    },

    RichardMille: {
        nombre: "Richard Mille",
        productos: []
    },

    Tissot: {
        nombre: "Tissot",
        productos: []
    },

    TechnoMarine: {
        nombre: "TechnoMarine",
        productos: []
    },

    Hublot: {
        nombre: "Hublot",
        productos: []
    },

    Cubanos: {
        nombre: "Cubanos",
        productos: []
    },

    Oakley: {
        nombre: "Oakley",
        productos: []
    },

    Orient: {
        nombre: "Orient",
        productos: []
    },

    Parejas: {
        nombre: "Parejas",
        productos: []
    },
};

// Lista global de todos los relojes, del más nuevo al más viejo
// (se usa en la vista "Todos")
const relojesRecientes = [];

// ======================================
// ELEMENTOS DEL CATÁLOGO
// ======================================

const catalogo = document.getElementById("catalogo");
const filtros = document.getElementById("filtros");

// ======================================
// FUNCIONES AUXILIARES
// ======================================

function escaparHTML(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caracter]);
}

// Mensaje: "Hola, me interesa el [nombre]. [descripción]. ¿Me puedes dar más información?"
function enlaceWhatsApp(reloj) {
    const descripcion = String(reloj.descripcion ?? "").trim().replace(/[.!?\s]+$/, "");

    const partes = [`Hola, me interesa el ${reloj.nombre}.`];
    if (descripcion) partes.push(`${descripcion}.`);
    partes.push("¿Me puedes dar más información?");

    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(partes.join(" "))}`;
}

// ======================================
// CREAR TARJETAS
// ======================================

function tarjeta(reloj, clave) {
    return `
        <article class="reloj" tabindex="0">
            <div class="reloj-foto">
                ${clave === "ofertas" ? '<span class="etiqueta">Oferta</span>' : ""}

                <img
                    src="${escaparHTML(reloj.imagen)}"
                    alt="${escaparHTML(reloj.nombre)}"
                    loading="lazy"
                >
            </div>

            <div class="reloj-info">
                <h3>${escaparHTML(reloj.nombre)}</h3>

                <p>${escaparHTML(reloj.descripcion)}</p>

                <span class="modelo" hidden>
                    ${escaparHTML(reloj.modelo)}
                </span>

                <span class="garantia" hidden>
                    ${escaparHTML(reloj.garantia)}
                </span>

                ${reloj.precio !== undefined && reloj.precio !== null && reloj.precio !== ""
                    ? `<span class="precio">${escaparHTML(reloj.precio)}</span>`
                    : ""}
            </div>
        </article>
    `;
}

// ======================================
// CREAR FILTROS
// ======================================

function crearFiltros() {
    const opciones = [
        ["todos", "Todos"],
        ...Object.entries(colecciones).map(([clave, coleccion]) => [
            clave,
            coleccion.nombre
        ])
    ];

    filtros.innerHTML = opciones.map(([clave, nombre]) => `
        <button
            type="button"
            data-clave="${escaparHTML(clave)}"
            aria-pressed="false"
        >
            ${escaparHTML(nombre)}
        </button>
    `).join("");
}

// ======================================
// MOSTRAR COLECCIÓN
// ======================================

function mostrar(clave) {
    const items = clave === "todos"
        ? relojesRecientes
        : (colecciones[clave]?.productos ?? []).map(reloj => ({ reloj, clave }));

    catalogo.innerHTML = items
        .map(({ reloj, clave }) => tarjeta(reloj, clave))
        .join("");

    filtros.querySelectorAll("button").forEach(boton => {
        boton.setAttribute(
            "aria-pressed",
            String(boton.dataset.clave === clave)
        );
    });
}

// ======================================
// CARGAR RELOJES DESDE SUPABASE
// ======================================

async function cargarRelojesSupabase() {
    if (!db) {
        console.error("Supabase no está conectado.");
        catalogo.innerHTML = `
            <p class="mensaje">
                No se pudo conectar con el catálogo.
                Comprueba la configuración de Supabase.
            </p>
        `;
        return false;
    }

    try {
        // Los más nuevos llegan primero
        const { data, error } = await db
            .from("relojes")
            .select("marca, nombre, descripcion, modelo, garantia, precio, imagen_url, created_at")
            .order("created_at", { ascending: false })
            .order("id", { ascending: false });

        if (error) throw error;

        data.forEach(reloj => {
            const clave = reloj.marca;

            if (!colecciones[clave] || !reloj.imagen_url) return;

            const producto = {
                imagen: reloj.imagen_url,
                nombre: reloj.nombre,
                descripcion: reloj.descripcion || "Consulta más información por WhatsApp.",
                modelo: reloj.modelo,
                garantia: reloj.garantia,
                precio: reloj.precio
            };

            // push (no unshift): respeta el orden que ya trae Supabase
            colecciones[clave].productos.push(producto);
            relojesRecientes.push({ reloj: producto, clave });
        });

        return true;

    } catch (error) {
        console.error("No se pudieron cargar los relojes:", error);

        catalogo.innerHTML = `
            <p class="mensaje">
                No se pudieron cargar los relojes nuevos.
                ${escaparHTML(error.message)}
            </p>
        `;

        return false;
    }
}

// ======================================
// INICIAR CATÁLOGO
// ======================================

async function iniciarCatalogo() {
    if (!catalogo || !filtros) return;

    catalogo.innerHTML = "<p>Cargando relojes...</p>";

    crearFiltros();

    const cargados = await cargarRelojesSupabase();

    if (!cargados) return;

    filtros.addEventListener("click", evento => {
        const boton = evento.target.closest("button");
        if (!boton) return;

        const clave = boton.dataset.clave;

        history.replaceState(
            null,
            "",
            clave === "todos" ? "relojes.html" : "#" + clave
        );

        mostrar(clave);
    });

    const inicial = location.hash.slice(1);

    mostrar(colecciones[inicial] ? inicial : "todos");
}

iniciarCatalogo();

// ======================================
// MENÚ HAMBURGUESA
// ======================================

const botonMenu = document.getElementById("botonMenu");
const panelMenu = document.getElementById("panelMenu");

if (botonMenu && panelMenu) {
    const menuOriginal = document.querySelector(".menu");

    if (menuOriginal) {
        panelMenu.innerHTML = menuOriginal.innerHTML;
    }

    botonMenu.addEventListener("click", () => {
        const seAbre = panelMenu.hidden;

        panelMenu.hidden = !seAbre;

        botonMenu.setAttribute(
            "aria-expanded",
            String(seAbre)
        );
    });
}

// ======================================
// ENLACES DE WHATSAPP (botón de contacto de index)
// Si el botón tiene data-mensaje, lo envía como texto del chat
// ======================================

document.querySelectorAll("[data-whatsapp]").forEach(enlace => {
    const mensaje = enlace.dataset.mensaje;
    enlace.href = `https://wa.me/${WHATSAPP}` +
        (mensaje ? `?text=${encodeURIComponent(mensaje)}` : "");
});