// DETALLE DEL RELOJ
(() => {
    const lista = document.getElementById("catalogo");
    if (!lista) return;

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
                <p class="detalle-descripcion"></p>
                <span class="detalle-precio"></span>
                <span class="detalle-modelo"></span>
                <span class="detalle-garantia"></span>
                <a class="boton detalle-whatsapp"
                   target="_blank"
                   rel="noopener">
                    Preguntar por WhatsApp
                </a>
            </div>
        </div>
    `;

    document.body.append(ventana);

    const foto = ventana.querySelector(".detalle-foto");
    const nombre = ventana.querySelector(".detalle-nombre");
    const descripcion = ventana.querySelector(".detalle-descripcion");
    const precio = ventana.querySelector(".detalle-precio");
    const modelo = ventana.querySelector(".detalle-modelo");
    const garantia = ventana.querySelector(".detalle-garantia");
    const whatsapp = ventana.querySelector(".detalle-whatsapp");

    function abrir(tarjeta) {
        const imagen = tarjeta.querySelector("img");
        const titulo = tarjeta.querySelector("h3");
        const texto = tarjeta.querySelector(".reloj-info p");
        const precioTarjeta = tarjeta.querySelector(".precio");
        const enlace = tarjeta.querySelector("a.boton");

        if (!imagen || !titulo || !texto) return;

        foto.src = imagen.src;
        foto.alt = titulo.textContent;
        nombre.textContent = titulo.textContent;
        descripcion.textContent = texto.textContent;
        modelo.textContent = tarjeta.querySelector(".modelo")?.textContent || "";
        garantia.textContent = tarjeta.querySelector(".garantia")?.textContent || "";
        precio.textContent = precioTarjeta
            ? precioTarjeta.textContent
            : "";

        whatsapp.href = enlace
            ? enlace.href
            : "#";

        ventana.showModal();
    }

    // Toda la tarjeta abre los detalles, excepto WhatsApp.
    lista.addEventListener("click", evento => {
        if (evento.target.closest("a")) return;

        const tarjeta = evento.target.closest(".reloj");
        if (tarjeta) abrir(tarjeta);
    });

    // Accesibilidad con teclado.
    lista.addEventListener("keydown", evento => {
        if (evento.key !== "Enter" && evento.key !== " ") return;

        const tarjeta = evento.target.closest(".reloj");
        if (!tarjeta || evento.target !== tarjeta) return;

        evento.preventDefault();
        abrir(tarjeta);
    });

    function prepararTarjetas() {
        lista.querySelectorAll(".reloj").forEach(tarjeta => {
            tarjeta.tabIndex = 0;
            tarjeta.setAttribute("role", "button");
            tarjeta.setAttribute("aria-label", "Ver detalles de " +
                (tarjeta.querySelector("h3")?.textContent || "este reloj"));
        });
    }

    new MutationObserver(prepararTarjetas).observe(lista, {
        childList: true
    });

    prepararTarjetas();

    ventana.querySelector(".detalle-cerrar").addEventListener("click", () => {
        ventana.close();
    });

    ventana.addEventListener("click", evento => {
        if (evento.target === ventana) ventana.close();
    });
})();