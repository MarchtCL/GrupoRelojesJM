// DETALLE DEL RELOJ: al tocar una tarjeta se abre una ventana con todos los datos
(() => {
    const lista = document.getElementById("catalogo");
    if (!lista) return;

    // La ventana se crea aquí, así relojes.html no necesita cambios grandes
    const ventana = document.createElement("dialog");
    ventana.className = "detalle";
    ventana.setAttribute("aria-labelledby", "detalleNombre");
    ventana.innerHTML = `
        <div class="detalle-caja">
            <span class="esquina e1"></span>
            <span class="esquina e2"></span>
            <span class="esquina e3"></span>
            <span class="esquina e4"></span>
            <button type="button" class="detalle-cerrar" aria-label="Cerrar">✕</button>

            <img class="detalle-foto" alt="">

            <div class="detalle-info">
                <h2 class="detalle-nombre" id="detalleNombre"></h2>

                <dl class="detalle-datos">
                    <div><dt>Descripción</dt><dd class="d-descripcion"></dd></div>
                    <div><dt>Modelo</dt><dd class="d-modelo"></dd></div>
                    <div><dt>Garantía</dt><dd class="d-garantia"></dd></div>
                </dl>

                <div class="detalle-pie">
                    <span class="detalle-precio"></span>
                    <a class="boton detalle-whatsapp" target="_blank" rel="noopener">Preguntar por WhatsApp</a>
                </div>
            </div>
        </div>`;
    document.body.append(ventana);

    const foto = ventana.querySelector(".detalle-foto");
    const nombre = ventana.querySelector(".detalle-nombre");
    const dDescripcion = ventana.querySelector(".d-descripcion");
    const dModelo = ventana.querySelector(".d-modelo");
    const dGarantia = ventana.querySelector(".d-garantia");
    const precio = ventana.querySelector(".detalle-precio");
    const whatsapp = ventana.querySelector(".detalle-whatsapp");

    // Busca el reloj en la lista de script.js (por su foto) para sacar modelo y garantía
    function buscarDatos(tarjeta) {
        const img = tarjeta.querySelector("img");
        if (!img || typeof colecciones === "undefined") return {};
        const imagen = img.getAttribute("src");

        for (const coleccion of Object.values(colecciones)) {
            const reloj = coleccion.productos.find(p => p.imagen === imagen);
            if (reloj) return reloj;
        }
        return {};
    }

    // Si la tarjeta no trae botón de WhatsApp, el enlace se arma con tu número de script.js
    const enlaceDirecto = titulo => {
        const numero = typeof WHATSAPP === "undefined" ? "" : WHATSAPP;
        return `https://wa.me/${numero}?text=${encodeURIComponent(`Hola, me interesa el ${titulo} ${descripcion}.`)}`;
    };

    // Copia los datos de la tarjeta tocada a la ventana
    function abrir(tarjeta) {
        const datos = buscarDatos(tarjeta);
        const texto = selector => (tarjeta.querySelector(selector) || {}).textContent || "";
        const titulo = texto("h3") || texto("h2") || "Reloj";
        const descripcion = texto(".reloj-info p") || datos.descripcion || "Sin descripción";   
        const img = tarjeta.querySelector("img");
        const enlace = tarjeta.querySelector("a[href*='wa.me']");

        foto.src = img ? img.src : "";
        foto.alt = titulo;
        nombre.textContent = titulo;
        dDescripcion.textContent = descripcion;
        dModelo.textContent = datos.modelo || "No especificado";
        dGarantia.textContent = datos.garantia || "No especificada";
        precio.textContent = texto(".precio");
        whatsapp.href = enlace ? enlace.href : enlaceDirecto(titulo);
        ventana.showModal();
    }

    // Tocar la tarjeta (menos su botón de WhatsApp) abre el detalle
    lista.addEventListener("click", evento => {
        if (evento.target.closest("a")) return;
        const tarjeta = evento.target.closest(".reloj");
        if (tarjeta) abrir(tarjeta);
    });

    // Con teclado: Enter o espacio sobre la tarjeta
    lista.addEventListener("keydown", evento => {
        if (evento.key !== "Enter" && evento.key !== " ") return;
        const tarjeta = evento.target.closest(".reloj");
        if (!tarjeta || evento.target !== tarjeta) return;
        evento.preventDefault();
        abrir(tarjeta);
    });

    // Las tarjetas se vuelven a dibujar al filtrar: cada nueva se puede enfocar con Tab
    const preparar = () => lista.querySelectorAll(".reloj:not([tabindex])").forEach(t => { t.tabIndex = 0; });
    new MutationObserver(preparar).observe(lista, { childList: true });
    preparar();

    // Cerrar: con la X, tocando fuera de la ventana, o con Escape (lo hace el navegador)
    ventana.querySelector(".detalle-cerrar").addEventListener("click", () => ventana.close());
    ventana.addEventListener("click", evento => {
        if (evento.target === ventana) ventana.close();
    });
})();