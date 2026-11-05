// BUSCADOR: filtra los relojes mientras escribes (busca en todas las marcas)
(() => {
    const lista = document.getElementById("catalogo");
    const filtros = document.getElementById("filtros");
    if (!lista || !filtros) return;

    // La casilla de búsqueda se crea aquí y se pone encima de los filtros
    const caja = document.createElement("div");
    caja.className = "buscador";
    caja.innerHTML = `
        <input type="search" id="buscar" placeholder="Buscar un reloj por nombre o descripción" aria-label="Buscar un reloj" autocomplete="off">
        <p class="buscador-vacio" hidden>No encontramos relojes con esa búsqueda.</p>`;
    filtros.before(caja);

    const campo = caja.querySelector("input");
    const vacio = caja.querySelector(".buscador-vacio");

    // Sin mayúsculas ni tildes: "garantia" encuentra "Garantía"
    const limpiar = texto => texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Oculta las tarjetas que no tienen todas las palabras escritas
    function aplicar() {
        const palabras = limpiar(campo.value).split(/\s+/).filter(Boolean);
        let visibles = 0;

        lista.querySelectorAll(".reloj").forEach(tarjeta => {
            const coincide = palabras.every(p => limpiar(tarjeta.textContent).includes(p));
            tarjeta.hidden = !coincide;
            if (coincide) visibles++;
        });

        vacio.hidden = !(palabras.length && visibles === 0);
    }

    // Al escribir, se busca en todas las marcas
    campo.addEventListener("input", () => {
        const activo = filtros.querySelector('[aria-pressed="true"]');
        const todos = filtros.querySelector('[data-clave="todos"]');
        if (campo.value.trim() && activo && todos && activo.dataset.clave !== "todos") todos.click();
        aplicar();
    });

    // Las tarjetas se vuelven a dibujar al filtrar o al cargar de Supabase: se repite la búsqueda
    new MutationObserver(aplicar).observe(lista, { childList: true });

    // La lupa del menú lleva a la casilla de búsqueda
    const irAlBuscador = () => {
        campo.scrollIntoView({ block: "center", behavior: "smooth" });
        campo.focus({ preventScroll: true });
    };

    const lupa = document.querySelector(".acciones a.icono");
    if (lupa) lupa.addEventListener("click", evento => { evento.preventDefault(); irAlBuscador(); });
    if (location.hash === "#buscar") irAlBuscador();
})();