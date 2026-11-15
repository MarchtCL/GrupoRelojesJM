/* =====================================
   Grupo JM — CARGA MASIVA DE RELOJES
   Usa las mismas funciones de admin.js:
   relojYaExiste, huellaFoto, fotoYaExiste y reducirFoto.
   Debe cargarse DESPUÉS de admin.js y de datos-diciembre.js.
===================================== */

(function () {
    if (
        typeof db === "undefined" ||
        typeof RELOJES_DICIEMBRE === "undefined" ||
        !document.getElementById("formReloj")
    ) return;

    // ---------- Sección en el panel ----------

    const seccion = document.createElement("div");
    seccion.className = "formulario";

    seccion.innerHTML = `
        <h2>Carga masiva: relojes de diciembre</h2>

        <p>
            Sube de una vez los ${RELOJES_DICIEMBRE.length} relojes de Rolex,
            Patek, Cartier y TechnoMarine. Los que ya existan se omiten solos.
        </p>

        <label>
            Garantía (para todos)
            <input type="text" id="masivoGarantia" required>
        </label>

        <label>
            Precio en COP (opcional, para todos)
            <input type="number" id="masivoPrecio" min="0" step="1">
        </label>

        <label>
            Fotos (abre la carpeta "fotos" del zip y selecciona todas)
            <input type="file" id="masivoFotos" accept="image/*" multiple>
        </label>

        <button class="boton" id="masivoBoton" type="button">
            Cargar relojes de diciembre
        </button>

        <p class="mensaje" id="masivoMensaje" role="status"
           aria-live="polite" style="white-space: pre-line;"></p>
    `;

    document.getElementById("formReloj").before(seccion);

    const inpGarantia = seccion.querySelector("#masivoGarantia");
    const inpPrecio = seccion.querySelector("#masivoPrecio");
    const inpFotos = seccion.querySelector("#masivoFotos");
    const boton = seccion.querySelector("#masivoBoton");
    const aviso = seccion.querySelector("#masivoMensaje");

    // ---------- Proceso ----------

    boton.addEventListener("click", async () => {
        const garantia = inpGarantia.value.trim();

        if (!garantia) {
            aviso.textContent = "Escribe la garantía antes de empezar.";
            inpGarantia.focus();
            return;
        }

        const archivos = new Map(
            [...inpFotos.files].map(f => [f.name, f])
        );

        const faltan = RELOJES_DICIEMBRE.filter(r => !archivos.has(r.archivo));

        if (faltan.length > 0) {
            aviso.textContent =
                `Faltan ${faltan.length} fotos. Selecciona todas las fotos de la carpeta "fotos".\n` +
                `Por ejemplo: ${faltan.slice(0, 3).map(r => r.archivo).join(", ")}`;
            return;
        }

        const total = RELOJES_DICIEMBRE.length;

        if (!confirm(
            `Se van a revisar ${total} relojes.\n\n` +
            `Los que ya estén en la página (mismo reloj o misma foto) se omiten.\n\n` +
            `¿Empezar la carga?`
        )) return;

        const precio = inpPrecio.value.trim() === ""
            ? null
            : Number(inpPrecio.value);

        boton.disabled = true;

        let nuevos = 0;
        let repetidos = 0;
        const fallidos = [];

        for (const [i, r] of RELOJES_DICIEMBRE.entries()) {
            aviso.textContent =
                `Procesando ${i + 1} de ${total}...\n` +
                `Nuevos: ${nuevos}. Repetidos omitidos: ${repetidos}. Con error: ${fallidos.length}.`;

            try {
                const archivo = archivos.get(r.archivo);

                // 1. mismo reloj (marca + modelo + descripción)
                if (await relojYaExiste(r.marca, r.modelo, r.descripcion)) {
                    repetidos++;
                    continue;
                }

                // 2. misma fotografía
                const huella = await huellaFoto(archivo);

                if (await fotoYaExiste(huella)) {
                    repetidos++;
                    continue;
                }

                // 3. subir foto
                const foto = await reducirFoto(archivo);
                const ruta = `${Date.now()}-${i}.webp`;

                const subida = await db.storage
                    .from("relojes")
                    .upload(ruta, foto, { contentType: "image/webp" });

                if (subida.error) throw subida.error;

                const { data } = db.storage
                    .from("relojes")
                    .getPublicUrl(ruta);

                // 4. guardar el reloj
                const guardado = await db.from("relojes").insert({
                    marca: r.marca,
                    nombre: r.nombre,
                    descripcion: r.descripcion,
                    precio: precio,
                    modelo: r.modelo,
                    garantia: garantia,
                    imagen_url: data.publicUrl,
                    imagen_ruta: ruta,
                    foto_hash: huella
                });

                if (guardado.error) {
                    await db.storage.from("relojes").remove([ruta]);

                    if (guardado.error.code === "23505") {
                        repetidos++;
                        continue;
                    }

                    throw guardado.error;
                }

                nuevos++;

            } catch (error) {
                fallidos.push(`${r.archivo}: ${error.message}`);
            }
        }

        aviso.textContent =
            `Terminado.\n` +
            `Nuevos: ${nuevos}.\n` +
            `Repetidos omitidos: ${repetidos}.\n` +
            `Con error: ${fallidos.length}.` +
            (fallidos.length
                ? `\n\n${fallidos.slice(0, 10).join("\n")}\n\nVuelve a pulsar el botón para reintentar: los que ya se subieron se omiten.`
                : "");

        boton.disabled = false;

        if (typeof cargarLista === "function") await cargarLista();
    });
})();