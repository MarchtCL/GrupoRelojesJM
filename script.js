// ======================================
// GRUPO JM — CATÁLOGO DE RELOJES
// Marcas + buscador + catálogo completo
// ======================================

const WHATSAPP = "573118261427";

// ======================================
// CONEXIÓN SUPABASE
// ======================================

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
// IMPORTANTE: las claves deben coincidir
// con los valores de la columna marca.
// ======================================

const colecciones = {

    rolex: { nombre: "Rolex", productos: [] },

    patek: { nombre: "Patek Philippe", productos: [] },

    casio: { nombre: "Casio", productos: [] },

    ofertas: { nombre: "Ofertas", productos: [] },

    AP: { nombre: "AP", productos: [] },

    Cartier: { nombre: "Cartier", productos: [] },

    Invicta: { nombre: "Invicta", productos: [] },

    QYQ: { nombre: "Q&Q", productos: [] },

    RichardMille: { nombre: "Richard Mille", productos: [] },

    Tissot: { nombre: "Tissot", productos: [] },

    TechnoMarine: { nombre: "TechnoMarine", productos: [] },

    Hublot: { nombre: "Hublot", productos: [] },

    Cubanos: { nombre: "Cubanos", productos: [] },

    Oakley: { nombre: "Oakley", productos: [] },

    Orient: { nombre: "Orient", productos: [] },

    Parejas: { nombre: "Parejas", productos: [] },

    Guess: { nombre: "Guess", productos: [] }

};

// ======================================
// ELEMENTOS
// ======================================

const relojesRecientes = [];

const catalogo = document.getElementById("catalogo");

const marcasGrid = document.getElementById("marcasGrid");

const buscador = document.getElementById("buscarReloj");



const botonVerTodos = document.getElementById("verTodos");

let marcaActiva = "todos";

let terminoBusqueda = "";


// ======================================
// SEGURIDAD HTML
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


// ======================================
// WHATSAPP
// ======================================

function enlaceWhatsApp(reloj) {

    const descripcion = String(
        reloj.descripcion ?? ""
    ).trim().replace(/[.!?\s]+$/, "");

    const partes = [
        `Hola, me interesa el ${reloj.nombre}.`
    ];

    if (descripcion) {
        partes.push(`${descripcion}.`);
    }

    partes.push("¿Me puedes dar más información?");

    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(partes.join(" "))}`;

}


// ======================================
// CREAR TARJETA DE RELOJ
// ======================================

function tarjeta(reloj, clave) {

    const esOferta = clave === "ofertas";

    return `
        <article class="reloj" tabindex="0">

            <div class="reloj-foto">

                ${esOferta
                    ? '<span class="etiqueta">Oferta</span>'
                    : ""
                }

                <img
                    src="${escaparHTML(reloj.imagen)}"
                    alt="${escaparHTML(reloj.nombre)}"
                    loading="lazy"
                >

            </div>

            <div class="reloj-info">

                <h3>
                    ${escaparHTML(reloj.nombre)}
                </h3>

                <p>
                    ${escaparHTML(reloj.descripcion)}
                </p>

                <span class="modelo" hidden>
                    ${escaparHTML(reloj.modelo)}
                </span>

                <span class="garantia" hidden>
                    ${escaparHTML(reloj.garantia)}
                </span>

                ${
                    reloj.precio !== undefined &&
                    reloj.precio !== null &&
                    reloj.precio !== ""
                        ? `<span class="precio">${escaparHTML(reloj.precio)}</span>`
                        : ""
                }

            </div>

        </article>
    `;
}


// ======================================
// CREAR TARJETAS DE MARCAS
// ======================================

function crearTarjetasMarcas() {

    const simbolos = {

        rolex: "♛",

        patek: "✥",

        casio: "◈",

        ofertas: "✦",

        AP: "AP",

        Cartier: "C",

        Invicta: "✧",

        QYQ: "Q",

        RichardMille: "RM",

        Tissot: "T",

        TechnoMarine: "◉",

        Hublot: "H",

        Cubanos: "✦",

        Oakley: "O",

        Orient: "◈",

        Parejas: "♡",

        Guess: "G"

    };

    marcasGrid.innerHTML = Object.entries(colecciones)

        .map(([clave, coleccion]) => `

            <button
                class="marca-card"
                type="button"
                data-clave="${escaparHTML(clave)}"
                aria-pressed="false"
            >

                <span class="marca-decoracion" aria-hidden="true">
                    ${simbolos[clave] || "✦"}
                </span>

                <span class="marca-nombre">
                    ${escaparHTML(coleccion.nombre)}
                </span>

                <span class="marca-ver">
                    Ver relojes →
                </span>

            </button>

        `)

        .join("");

}


// ======================================
// OBTENER RELOJES FILTRADOS
// ======================================

function obtenerRelojesFiltrados() {

    let items = marcaActiva === "todos"

        ? relojesRecientes

        : (colecciones[marcaActiva]?.productos ?? []).map(reloj => ({

            reloj,

            clave: marcaActiva

        }));


    // FILTRO DE BÚSQUEDA

    if (terminoBusqueda) {

        const termino = terminoBusqueda.toLocaleLowerCase("es");

        items = items.filter(({ reloj }) =>

            `${reloj.nombre} ${reloj.descripcion} ${reloj.modelo}`

                .toLocaleLowerCase("es")

                .includes(termino)

        );

    }

    return items;

}


// ======================================
// MOSTRAR RELOJES
// ======================================

function mostrar(clave = marcaActiva) {

    marcaActiva = clave;

    const items = obtenerRelojesFiltrados();


    // MOSTRAR PRODUCTOS

    catalogo.innerHTML = items.length

        ? items.map(({ reloj, clave: marca }) =>

            tarjeta(reloj, marca)

        ).join("")

        : `<p class="mensaje">No encontramos relojes para esta búsqueda.</p>`;


    // ACTUALIZAR MARCA ACTIVA

    marcasGrid.querySelectorAll(".marca-card").forEach(boton => {

        const activa = boton.dataset.clave === marcaActiva;

        boton.classList.toggle("marca-activa", activa);

        boton.setAttribute("aria-pressed", String(activa));

    });


    // TÍTULO DEL CATÁLOGO

    const nombreMarca = marcaActiva === "todos"

        ? "Todos los relojes"

        : colecciones[marcaActiva]?.nombre ?? "Relojes";

    document.getElementById("tituloCatalogo").textContent = nombreMarca;


    // CONTADOR DE PRODUCTOS


    // EVITAR QUE WHATSAPP ACTIVE EL DETALLE

    catalogo.querySelectorAll(".boton-whatsapp-reloj").forEach(enlace => {

        enlace.addEventListener("click", evento => {

            evento.stopPropagation();

        });

        enlace.addEventListener("keydown", evento => {

            evento.stopPropagation();

        });

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

            .order("created_at", { ascending: false })

            .order("id", { ascending: false });


        if (error) throw error;


        // RECORRER LOS RELOJES

        data.forEach(reloj => {

            const clave = reloj.marca;

            // Evitar marcas desconocidas y productos sin imagen

            if (!colecciones[clave] || !reloj.imagen_url) return;


            const producto = {

                imagen: reloj.imagen_url,

                nombre: reloj.nombre,

                descripcion: reloj.descripcion ||
                    "Consulta más información por WhatsApp.",

                modelo: reloj.modelo,

                garantia: reloj.garantia,

                precio: reloj.precio

            };


            // GUARDAR EN SU COLECCIÓN

            colecciones[clave].productos.push(producto);


            // GUARDAR EN TODOS LOS RELOJES

            relojesRecientes.push({

                reloj: producto,

                clave

            });

        });


        return true;

    } catch (error) {

        console.error(
            "No se pudieron cargar los relojes:",
            error
        );

        catalogo.innerHTML = `

            <p class="mensaje">

                No se pudieron cargar los relojes.

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

    if (!catalogo || !marcasGrid) return;


    catalogo.innerHTML = `

        <p class="mensaje">

            Cargando relojes...

        </p>

    `;


    // CREAR MARCAS

    crearTarjetasMarcas();


    // CLIC EN LAS MARCAS

    marcasGrid.addEventListener("click", evento => {

        const boton = evento.target.closest(".marca-card");

        if (!boton) return;


        mostrar(boton.dataset.clave);


        document.getElementById("tituloCatalogo").scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    });


    // BOTÓN VER TODOS

    botonVerTodos?.addEventListener("click", () => {

        if (buscador) buscador.value = "";

        terminoBusqueda = "";

        mostrar("todos");


        document.getElementById("tituloCatalogo").scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    });


    // BUSCADOR

    buscador?.addEventListener("input", () => {

        terminoBusqueda = buscador.value.trim();

        mostrar(marcaActiva);

    });


    // CARGAR SUPABASE

    const cargados = await cargarRelojesSupabase();

    if (!cargados) return;


    // FILTRO INICIAL

    const inicial = decodeURIComponent(location.hash.slice(1));

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

        panelMenu.querySelectorAll("[data-inactivo]").forEach(enlace => {

            enlace.addEventListener("click", evento => {

                evento.preventDefault();

            });

        });

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
// AUDÍFONOS DESACTIVADOS
// ======================================

document.querySelectorAll("[data-inactivo]").forEach(enlace => {

    enlace.addEventListener("click", evento => {

        evento.preventDefault();

    });

});


// ======================================
// ENLACES DE WHATSAPP
// ======================================

document.querySelectorAll("[data-whatsapp]").forEach(enlace => {

    const mensaje = enlace.dataset.mensaje;

    enlace.href = `https://wa.me/${WHATSAPP}` +

        (mensaje
            ? `?text=${encodeURIComponent(mensaje)}`
            : "");

});