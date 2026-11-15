// ZOOM DE LA FOTO: al tocar la foto de la ventana de detalles se abre en grande.
// Celular: pellizcar con dos dedos, doble toque, arrastrar para moverla.
// Computador: rueda del mouse, doble clic, botones + y −, arrastrar.
// Se carga DESPUÉS de detalle.js y no necesita cambios en style.css.
(() => {
    const MIN = 1;
    const MAX = 5;

    // ---------- Estilos (van aquí para no tocar style.css) ----------

    const estilo = document.createElement("style");
    estilo.textContent = `
        .detalle-foto { cursor: zoom-in; }

        .zoom-foto {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            max-width: none;
            max-height: none;
            margin: 0;
            padding: 0;
            border: 0;
            overflow: hidden;
            color: #fff;
            background: #000;
        }

        .zoom-foto::backdrop { background: #000; }

        .zoom-escenario {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            touch-action: none;
            user-select: none;
            -webkit-user-select: none;
        }

        .zoom-escenario img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transform-origin: 50% 50%;
            will-change: transform;
            -webkit-user-drag: none;
            cursor: zoom-in;
        }

        .zoom-escenario.ampliada img { cursor: grab; }

        .zoom-botones {
            position: absolute;
            top: max(12px, env(safe-area-inset-top));
            right: max(12px, env(safe-area-inset-right));
            display: flex;
            gap: 8px;
            z-index: 2;
        }

        .zoom-botones button {
            width: 46px;
            height: 46px;
            padding: 0;
            border-radius: 50%;
            border: 1px solid var(--dorado-oscuro, #8C6425);
            background: rgba(14, 10, 10, 0.78);
            color: var(--dorado-vivo, #F0C44D);
            font-family: inherit;
            font-size: 24px;
            line-height: 1;
            cursor: pointer;
        }

        .zoom-botones button:hover,
        .zoom-botones button:focus-visible {
            background: var(--dorado, #D4AF37);
            color: var(--negro, #0E0A0A);
        }

        .zoom-ayuda {
            position: absolute;
            left: 0;
            right: 0;
            bottom: max(16px, env(safe-area-inset-bottom));
            margin: 0;
            text-align: center;
            font-size: 0.9rem;
            opacity: 0.75;
            pointer-events: none;
            transition: opacity 0.6s;
        }

        .zoom-ayuda.oculta { opacity: 0; }
    `;
    document.head.append(estilo);

    // ---------- Ventana del zoom ----------

    const ventana = document.createElement("dialog");
    ventana.className = "zoom-foto";
    ventana.setAttribute("aria-label", "Foto ampliada");
    ventana.innerHTML = `
        <div class="zoom-escenario"><img alt="" draggable="false"></div>
        <div class="zoom-botones">
            <button type="button" data-z="menos" aria-label="Alejar">−</button>
            <button type="button" data-z="mas" aria-label="Acercar">+</button>
            <button type="button" data-z="cerrar" aria-label="Cerrar foto">✕</button>
        </div>
        <p class="zoom-ayuda">Toca dos veces o pellizca para acercar</p>`;
    document.body.append(ventana);

    const escenario = ventana.querySelector(".zoom-escenario");
    const img = escenario.querySelector("img");
    const ayuda = ventana.querySelector(".zoom-ayuda");

    // ---------- Estado del zoom ----------

    let escala = 1;
    let mx = 0; // desplazamiento horizontal
    let my = 0; // desplazamiento vertical

    function aplicar() {
        img.style.transform = `translate(${mx}px, ${my}px) scale(${escala})`;
        escenario.classList.toggle("ampliada", escala > 1.01);
    }

    // Evita que la foto se salga de la pantalla al moverla
    function limitar() {
        const maxX = Math.max(0, (img.offsetWidth * escala - escenario.clientWidth) / 2);
        const maxY = Math.max(0, (img.offsetHeight * escala - escenario.clientHeight) / 2);
        mx = Math.min(maxX, Math.max(-maxX, mx));
        my = Math.min(maxY, Math.max(-maxY, my));
    }

    // Cambia el zoom manteniendo fijo el punto (px, py) medido desde el centro
    function zoomEn(nueva, px, py) {
        nueva = Math.min(MAX, Math.max(MIN, nueva));
        mx = px - (px - mx) * (nueva / escala);
        my = py - (py - my) * (nueva / escala);
        escala = nueva;
        if (escala === MIN) { mx = 0; my = 0; }
        limitar();
        aplicar();
    }

    function desdeCentro(x, y) {
        const r = escenario.getBoundingClientRect();
        return { x: x - r.left - r.width / 2, y: y - r.top - r.height / 2 };
    }

    // ---------- Abrir y cerrar ----------

    document.addEventListener("click", evento => {
        const foto = evento.target.closest && evento.target.closest(".detalle-foto");
        if (!foto || !foto.src) return;

        img.src = foto.currentSrc || foto.src;
        img.alt = foto.alt || "";
        escala = 1;
        mx = 0;
        my = 0;
        aplicar();

        ayuda.classList.remove("oculta");
        ventana.showModal();
        setTimeout(() => ayuda.classList.add("oculta"), 3500);
    });

    ventana.addEventListener("close", () => {
        punteros.clear();
        img.removeAttribute("src");
    });

    ventana.querySelector(".zoom-botones").addEventListener("click", evento => {
        const boton = evento.target.closest("button");
        if (!boton) return;

        if (boton.dataset.z === "cerrar") ventana.close();
        if (boton.dataset.z === "mas") zoomEn(escala * 1.5, 0, 0);
        if (boton.dataset.z === "menos") zoomEn(escala / 1.5, 0, 0);
    });

    // Teclado: + acerca, − aleja, 0 vuelve al tamaño normal (Escape cierra solo)
    ventana.addEventListener("keydown", evento => {
        if (evento.key === "+" || evento.key === "=") zoomEn(escala * 1.5, 0, 0);
        if (evento.key === "-") zoomEn(escala / 1.5, 0, 0);
        if (evento.key === "0") zoomEn(1, 0, 0);
    });

    window.addEventListener("resize", () => {
        if (!ventana.open) return;
        limitar();
        aplicar();
    });

    // ---------- Rueda del mouse ----------

    escenario.addEventListener("wheel", evento => {
        evento.preventDefault();
        const c = desdeCentro(evento.clientX, evento.clientY);
        zoomEn(escala * (evento.deltaY < 0 ? 1.2 : 1 / 1.2), c.x, c.y);
    }, { passive: false });

    // ---------- Dedos y mouse: mover, pellizcar, doble toque ----------

    const punteros = new Map();
    let huboDosDedos = false;
    let distanciaInicial = 0;
    let puntoMedioAntes = null;
    let ultimoToque = 0;

    function dosPunteros() {
        const [a, b] = [...punteros.values()];
        return {
            distancia: Math.hypot(a.x - b.x, a.y - b.y),
            medio: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        };
    }

    escenario.addEventListener("pointerdown", evento => {
        escenario.setPointerCapture(evento.pointerId);

        if (punteros.size === 0) huboDosDedos = false;

        punteros.set(evento.pointerId, {
            x: evento.clientX,
            y: evento.clientY,
            x0: evento.clientX,
            y0: evento.clientY,
            movido: false
        });

        if (punteros.size === 2) {
            huboDosDedos = true;
            const d = dosPunteros();
            distanciaInicial = d.distancia || 1;
            puntoMedioAntes = d.medio;
        }
    });

    escenario.addEventListener("pointermove", evento => {
        const p = punteros.get(evento.pointerId);
        if (!p) return;

        const dx = evento.clientX - p.x;
        const dy = evento.clientY - p.y;

        p.x = evento.clientX;
        p.y = evento.clientY;

        if (Math.hypot(p.x - p.x0, p.y - p.y0) > 8) p.movido = true;

        if (punteros.size === 1) {
            // Un dedo: mover la foto (solo si está ampliada)
            if (escala > 1.01) {
                mx += dx;
                my += dy;
                limitar();
                aplicar();
            }
            return;
        }

        if (punteros.size === 2) {
            // Dos dedos: pellizcar para acercar o alejar
            const d = dosPunteros();
            const c = desdeCentro(d.medio.x, d.medio.y);

            mx += d.medio.x - puntoMedioAntes.x;
            my += d.medio.y - puntoMedioAntes.y;
            puntoMedioAntes = d.medio;

            const nueva = Math.min(MAX, Math.max(MIN, escala * (d.distancia / distanciaInicial)));
            distanciaInicial = d.distancia || 1;
            zoomEn(nueva, c.x, c.y);
        }
    });

    function soltar(evento) {
        const p = punteros.get(evento.pointerId);
        if (!p) return;

        punteros.delete(evento.pointerId);

        // Si queda un dedo, que siga moviendo sin saltos
        if (punteros.size === 1) puntoMedioAntes = null;

        const fueToque = evento.type === "pointerup" && !p.movido && !huboDosDedos && punteros.size === 0;
        if (!fueToque) return;

        const r = img.getBoundingClientRect();
        const sobreFoto =
            evento.clientX >= r.left && evento.clientX <= r.right &&
            evento.clientY >= r.top && evento.clientY <= r.bottom;

        // Tocar el fondo negro, fuera de la foto, cierra el zoom
        if (!sobreFoto) {
            ventana.close();
            return;
        }

        // Doble toque (o doble clic): acerca o vuelve al tamaño normal
        const ahora = Date.now();

        if (ahora - ultimoToque < 320) {
            const c = desdeCentro(evento.clientX, evento.clientY);
            zoomEn(escala > 1.01 ? 1 : 2.5, c.x, c.y);
            ultimoToque = 0;
        } else {
            ultimoToque = ahora;
        }
    }

    escenario.addEventListener("pointerup", soltar);
    escenario.addEventListener("pointercancel", soltar);
})();