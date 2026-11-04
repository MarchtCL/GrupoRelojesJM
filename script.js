
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
        productos: [
        ]
    },

    patek: {
        nombre: "Patek Philippe",
        productos: [
          
        ]
    },

    casio: {
        nombre: "Casio",
        productos: [

        ]
    },

    ofertas: {
        nombre: "Ofertas",
        productos: [
        ]
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
    }
};

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

function enlaceWhatsApp(reloj) {
    const mensaje = `Hola, me interesa el ${reloj.nombre}. ${reloj.descripcion}. ¿Me pueden dar más información?`;

    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
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
    const claves = clave === "todos"
        ? Object.keys(colecciones)
        : [clave];

    catalogo.innerHTML = claves
        .filter(k => colecciones[k])
        .flatMap(k =>
            colecciones[k].productos.map(reloj => tarjeta(reloj, k))
        )
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
        const { data, error } = await db
            .from("relojes")
            .select("marca, nombre, descripcion, modelo, garantia, precio, imagen_url, created_at")
            .order("created_at", { ascending: false });

        if (error) throw error;

        data.forEach(reloj => {
            const clave = reloj.marca;

            if (!colecciones[clave] || !reloj.imagen_url) return;

            colecciones[clave].productos.unshift({
                imagen: reloj.imagen_url,
                nombre: reloj.nombre,
                descripcion: reloj.descripcion || "Consulta más información por WhatsApp.",
                modelo: reloj.modelo,
                garantia: reloj.garantia,
                precio: reloj.precio
            });
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
// ENLACES DE WHATSAPP
// ======================================

document.querySelectorAll("[data-whatsapp]").forEach(enlace => {
    enlace.href = `https://wa.me/${WHATSAPP}`;
});
