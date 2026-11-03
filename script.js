
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
            { imagen: "ROLEX/rolex.png", nombre: "Rolex clásico", descripcion: "Reloj Rolex de estilo clásico." },
            { imagen: "ROLEX/rolex2.JPG", nombre: "Rolex GMT-Master II", descripcion: "Reloj Rolex GMT-Master II CARA VERDE." },
            { imagen: "ROLEX/rolex3.jpg", nombre: "Rolex Land-Dweller", descripcion: "Reloj Rolex Land-Dweller." },
            { imagen: "ROLEX/rolex4.jpg", nombre: "Rolex GMT-Master II", descripcion: "Reloj Rolex GMT-Master II cara negra con brazalete de acero y oro." },
            { imagen: "ROLEX/rolex5.jpg", nombre: "Rolex GMT-Master II", descripcion: "Reloj Rolex GMT-Master II (Pepsi)." },
            { imagen: "ROLEX/rolex6.jpg", nombre: "Rolex GMT-Master II", descripcion: "Reloj Rolex GMT-Master II plateado con cara verde." },
            { imagen: "ROLEX/rolex7.jpg", nombre: "Rolex Datejust", descripcion: "Reloj Rolex Datejust dorado con cara negra." },
            { imagen: "ROLEX/rolex8.jpg", nombre: "Rolex GMT-Master II", descripcion: "Reloj Rolex GMT-Master II plateado con cara azul." },
            { imagen: "ROLEX/rolex9.jpg", nombre: "Rolex Datejust", descripcion: "Reloj Rolex Datejust cara blanca." },
            { imagen: "ROLEX/rolex10.jpg", nombre: "Rolex Land-Dweller", descripcion: "Reloj Rolex Land-Dweller dorado con cara verde." },
            { imagen: "ROLEX/rolex11.jpg", nombre: "Rolex Land-Dweller", descripcion: "Reloj Rolex Land-Dweller." }
        ]
    },

    patek: {
        nombre: "Patek Philippe",
        productos: [
            { imagen: "PATEK/patek.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus." },
            { imagen: "PATEK/patek2.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus plateado con azul." },
            { imagen: "PATEK/patek3.jpg", nombre: "Patek Philippe Aquanaut", descripcion: "Reloj Patek Philippe Aquanaut F." },
            { imagen: "PATEK/patek4.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus dorado con platiado." },
            { imagen: "PATEK/patek5.jpg", nombre: "Patek Philippe Calatrava", descripcion: "Reloj Patek Philippe Calatrava." },
            { imagen: "PATEK/patek6.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus plateado con dorado F." },
            { imagen: "PATEK/patek7.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus plateado con negro." },
            { imagen: "PATEK/patek8.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus dorado con negro claro." },
            { imagen: "PATEK/patek9.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus dorado con negro oscuro." },
            { imagen: "PATEK/patek10.jpg", nombre: "Patek Philippe Nautilus", descripcion: "Reloj Patek Philippe Nautilus plateado con blanco intenso." }
        ]
    },

    casio: {
        nombre: "Casio",
        productos: [
            { imagen: "CASIO/casio.png", nombre: "Casio clásico", descripcion: "Reloj Casio clásico." },
            { imagen: "CASIO/casio1.jpg", nombre: "Casio Vintage", descripcion: "Reloj Casio con estilo vintage." },
            { imagen: "CASIO/casio2.jpg", nombre: "Casio Edifice", descripcion: 'Casio Edifice "Slim" con bisel octogonal.' },
            { imagen: "CASIO/casio3.jpg", nombre: "Casio Edifice octogonal", descripcion: "Reloj Casio con bisel octogonal." },
            { imagen: "CASIO/casio4.jpg", nombre: "Casio G-Shock GA-2100", descripcion: "Reloj Casio G-Shock GA-2100." },
            { imagen: "CASIO/casio5.jpg", nombre: "G-Shock GA-2100", descripcion: "G-Shock GA-2100 modificado con un kit de resina transparente oscura." }
        ]
    },

    ofertas: {
        nombre: "Ofertas",
        productos: [
            { imagen: "png/oferta.png", nombre: "Reloj en oferta", descripcion: "Reloj disponible en oferta." }
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

                <a class="boton"
                   href="${enlaceWhatsApp(reloj)}"
                   target="_blank"
                   rel="noopener">
                    Preguntar por WhatsApp
                </a>
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
            .select("marca, nombre, descripcion, precio, imagen_url, created_at")
            .order("created_at", { ascending: false });

        if (error) throw error;

        data.forEach(reloj => {
            const clave = reloj.marca;

            if (!colecciones[clave] || !reloj.imagen_url) return;

            colecciones[clave].productos.unshift({
                imagen: reloj.imagen_url,
                nombre: reloj.nombre,
                descripcion: reloj.descripcion || "Consulta más información por WhatsApp.",
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
