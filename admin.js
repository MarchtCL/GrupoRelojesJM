
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const login = document.getElementById("login");
const panel = document.getElementById("panel");
const salir = document.getElementById("salir");
const formReloj = document.getElementById("formReloj");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const mensajeLogin = document.getElementById("mensajeLogin");

const importarDrive = document.getElementById("importarDrive");
const mensajeDrive = document.getElementById("mensajeDrive");

const TAMANO_LOTE = 100;

const formatoPrecio = precio =>
    Number(precio).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });

// ======================================
// MOSTRAR LOGIN O PANEL
// ======================================

function mostrarPanel(haySesion) {
    login.hidden = haySesion;
    panel.hidden = !haySesion;
    salir.hidden = !haySesion;

    if (haySesion) cargarLista();
}

// ======================================
// REDUCIR FOTOGRAFÍA
// ======================================

function reducirFoto(archivo, maximo = 1000) {
    return new Promise((ok, fallo) => {
        if (!archivo) {
            fallo(new Error("Selecciona una fotografía."));
            return;
        }

        const img = new Image();

        img.onload = () => {
            const k = Math.min(
                1,
                maximo / Math.max(img.width, img.height)
            );

            const lienzo = document.createElement("canvas");

            lienzo.width = Math.round(img.width * k);
            lienzo.height = Math.round(img.height * k);

            lienzo.getContext("2d").drawImage(
                img,
                0,
                0,
                lienzo.width,
                lienzo.height
            );

            lienzo.toBlob(
                b => b
                    ? ok(b)
                    : fallo(new Error("No se pudo procesar la fotografía")),
                "image/webp",
                0.85
            );

            URL.revokeObjectURL(img.src);
        };

        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            fallo(new Error("No se pudo leer la fotografía."));
        };

        img.src = URL.createObjectURL(archivo);
    });
}

// ======================================
// INICIAR SESIÓN
// ======================================

login.addEventListener("submit", async evento => {
    evento.preventDefault();

    const boton = login.querySelector('button[type="submit"]');

    boton.disabled = true;
    boton.textContent = "Verificando...";
    mensajeLogin.textContent = "Conectando con Supabase...";

    try {
        const { data, error } = await db.auth.signInWithPassword({
            email: document.getElementById("correo").value.trim(),
            password: document.getElementById("clave").value
        });

        if (error) {
            mensajeLogin.textContent = "Error: " + error.message;
            return;
        }

        if (data.session) {
            mensajeLogin.textContent = "";
            mostrarPanel(true);
        } else {
            mensajeLogin.textContent = "No se pudo iniciar la sesión.";
        }

    } catch (error) {
        mensajeLogin.textContent = "Error de conexión: " + error.message;

    } finally {
        boton.disabled = false;
        boton.textContent = "Entrar";
    }
});

// ======================================
// CERRAR SESIÓN
// ======================================

salir.addEventListener("click", async () => {
    salir.disabled = true;

    const { error } = await db.auth.signOut();

    if (error) {
        mensaje.textContent =
            "No se pudo cerrar sesión: " + error.message;
    } else {
        mostrarPanel(false);
    }

    salir.disabled = false;
});

// ======================================
// AGREGAR RELOJ
// ======================================

formReloj.addEventListener("submit", async evento => {
    evento.preventDefault();

    const boton = document.getElementById("guardar");

    boton.disabled = true;
    mensaje.textContent = "Subiendo fotografía...";

    try {
        const archivo = document.getElementById("foto").files[0];
        const foto = await reducirFoto(archivo);

        const ruta = `${Date.now()}.webp`;

        const subida = await db.storage
            .from("relojes")
            .upload(ruta, foto, {
                contentType: "image/webp"
            });

        if (subida.error) throw subida.error;

        const { data } = db.storage
            .from("relojes")
            .getPublicUrl(ruta);

        const guardado = await db.from("relojes").insert({
            marca: document.getElementById("marca").value,
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: document.getElementById("precio").value || null,
            modelo: document.getElementById("modelo").value.trim(),
            garantia: document.getElementById("garantia").value.trim(),
            imagen_url: data.publicUrl,
            imagen_ruta: ruta
        });

        if (guardado.error) throw guardado.error;

        formReloj.reset();

        mensaje.textContent = "¡Reloj agregado correctamente!";
        await cargarLista();

    } catch (error) {
        mensaje.textContent =
            "No se pudo guardar: " + error.message;

    } finally {
        boton.disabled = false;
    }
});

// ======================================
// CARGAR LISTA DE RELOJES
// ======================================

async function cargarLista() {
    lista.textContent = "Cargando relojes...";

    const { data, error } = await db
        .from("relojes")
        .select("*")
        .order("created_at", { ascending: false });

    lista.replaceChildren();

    if (error) {
        lista.textContent =
            "No se pudo cargar la lista: " + error.message;
        return;
    }

    if (!data || data.length === 0) {
        lista.textContent = "Todavía no has agregado relojes.";
        return;
    }

    data.forEach(reloj => {
        lista.append(crearFila(reloj));
    });
}

// ======================================
// CREAR FILA DE CADA RELOJ
// ======================================

function crearFila(reloj) {
    const fila = document.createElement("div");
    fila.className = "fila-admin";

    const img = document.createElement("img");
    img.src = reloj.imagen_url;
    img.alt = reloj.nombre;

    const info = document.createElement("div");

    const nombre = document.createElement("strong");
    nombre.textContent = reloj.nombre;

    const detalle = document.createElement("span");

    detalle.textContent =
        `${reloj.marca} · ${reloj.modelo || ""} · ${reloj.garantia || ""}`;

    info.append(nombre, detalle);

    const borrar = document.createElement("button");
    borrar.type = "button";
    borrar.textContent = "Eliminar";

    borrar.addEventListener("click", () => eliminar(reloj));

    fila.append(img, info, borrar);

    return fila;
}

// ======================================
// ELIMINAR RELOJ
// ======================================

async function eliminar(reloj) {
    if (!confirm(`¿Eliminar "${reloj.nombre}"?`)) return;

    const { error: errorBD } = await db
        .from("relojes")
        .delete()
        .eq("id", reloj.id);

    if (errorBD) {
        alert("No se pudo eliminar: " + errorBD.message);
        return;
    }

    if (reloj.imagen_ruta) {
        const { error: errorFoto } = await db.storage
            .from("relojes")
            .remove([reloj.imagen_ruta]);

        if (errorFoto) {
            console.error(
                "No se pudo eliminar la fotografía:",
                errorFoto
            );
        }
    }

    await cargarLista();
}

// ======================================
// COMPROBAR SESIÓN AL ABRIR
// ======================================

db.auth.getSession().then(({ data, error }) => {
    if (error) {
        console.error("Error al comprobar sesión:", error);
        mostrarPanel(false);
        return;
    }

    mostrarPanel(Boolean(data.session));

}).catch(error => {
    console.error("Error de conexión con Supabase:", error);
    mostrarPanel(false);
});

// ======================================
// IMPORTAR DESDE GOOGLE DRIVE
// ======================================

async function llamarImportador(datos) {
    const { data, error } = await db.auth.getSession();

    if (error) throw error;

    const session = data.session;

    if (!session) {
        throw new Error("Debes iniciar sesión nuevamente.");
    }

    const respuesta = await fetch(
        "https://kfsgrvjzstonombwtjpv.supabase.co/functions/v1/importar-grupo-JM",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.access_token}`
            },
            body: JSON.stringify(datos)
        }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok || !resultado.success) {
        throw new Error(
            resultado.error || "Error en el importador."
        );
    }

    return resultado;
}

// ======================================
// IMPORTACIÓN AUTOMÁTICA POR LOTES
// ======================================

if (importarDrive && mensajeDrive) {

    importarDrive.addEventListener("click", async () => {

        importarDrive.disabled = true;
        importarDrive.textContent = "Preparando importación...";

        mensajeDrive.textContent =
            "Conectando con Google Drive...";

        let totalProcesadas = 0;
        let totalOmitidas = 0;

        try {

            // 1. COMPROBAR FOTOGRAFÍAS

            const escaneo = await llamarImportador({
                action: "scan"
            });

            const total = escaneo.fotografiasEncontradas;

            if (!Number.isInteger(total) || total < 0) {
                throw new Error("La cantidad de fotografías recibida no es válida.");
            }

            if (total === 0) {
                mensajeDrive.textContent =
                    "No se encontraron fotografías.";
                return;
            }

            const confirmar = confirm(
                `Se encontraron ${total} fotografías en Google Drive.\n\n` +
                `Se importarán en lotes de ${TAMANO_LOTE}.\n\n` +
                `Las fotografías que ya existan se omitirán automáticamente.\n\n` +
                `¿Deseas comenzar la importación?`
            );

            if (!confirmar) {
                mensajeDrive.textContent =
                    "Importación cancelada. No se inició la carga.";
                return;
            }

            // 2. CALCULAR LOTES

            const totalLotes = Math.ceil(total / TAMANO_LOTE);

            let offset = 0;
            let numeroLote = 0;

            // 3. IMPORTAR TODOS LOS LOTES

            while (offset < total) {

                numeroLote++;

                importarDrive.textContent =
                    `Importando ${numeroLote}/${totalLotes}`;

                mensajeDrive.textContent =
                    `Procesando lote ${numeroLote} de ${totalLotes}...\n` +
                    `Fotografías revisadas: ${offset} de ${total}`;

                const resultado = await llamarImportador({
                    action: "import",
                    offset: offset,
                    batchSize: TAMANO_LOTE
                });

                if (
                    !Number.isInteger(resultado.siguienteOffset) ||
                    resultado.siguienteOffset <= offset ||
                    resultado.siguienteOffset > total
                ) {
                    throw new Error(
                        "El importador devolvió una posición incorrecta. Se detuvo para evitar repetir el proceso."
                    );
                }

                totalProcesadas += resultado.procesadas || 0;
                totalOmitidas += resultado.omitidas || 0;

                offset = resultado.siguienteOffset;

                mensajeDrive.textContent =
                    `Lote ${numeroLote} de ${totalLotes} completado.\n` +
                    `Revisadas: ${offset} de ${total}.\n` +
                    `Nuevas: ${totalProcesadas}.\n` +
                    `Duplicadas omitidas: ${totalOmitidas}.`;
            }

            // ======================================
// OPTIMIZAR FOTOGRAFÍAS YA SUBIDAS
// ======================================

async function optimizarFotos(escribir) {
    const { data, error } = await db
        .from("relojes")
        .select("id, imagen_url, imagen_ruta");

    if (error) throw error;

    const pendientes = data.filter(r => r.imagen_url && r.imagen_ruta && !r.imagen_ruta.endsWith(".webp"));
    let hechas = 0;
    let fallidas = 0;

    for (const [i, reloj] of pendientes.entries()) {
        escribir(`Optimizando fotografías: ${i + 1} de ${pendientes.length}...`);

        try {
            const respuesta = await fetch(reloj.imagen_url);
            if (!respuesta.ok) throw new Error("No se pudo descargar la foto.");

            const foto = await reducirFoto(await respuesta.blob());
            const ruta = `${Date.now()}-${reloj.id}.webp`;

            const subida = await db.storage
                .from("relojes")
                .upload(ruta, foto, { contentType: "image/webp" });
            if (subida.error) throw subida.error;

            const { data: publica } = db.storage.from("relojes").getPublicUrl(ruta);

            const cambio = await db
                .from("relojes")
                .update({ imagen_url: publica.publicUrl, imagen_ruta: ruta })
                .eq("id", reloj.id);
            if (cambio.error) throw cambio.error;

            await db.storage.from("relojes").remove([reloj.imagen_ruta]);
            hechas++;

        } catch (error) {
            console.error(`No se pudo optimizar el reloj ${reloj.id}:`, error);
            fallidas++;
        }
    }

    return { total: pendientes.length, hechas, fallidas };
}

// Botón para optimizar las fotos que ya estaban subidas
const botonOptimizar = document.getElementById("optimizarFotos");

if (botonOptimizar && mensajeDrive) {
    botonOptimizar.addEventListener("click", async () => {
        botonOptimizar.disabled = true;

        try {
            const r = await optimizarFotos(texto => { mensajeDrive.textContent = texto; });

            mensajeDrive.textContent = r.total === 0
                ? "Todas las fotografías ya estaban optimizadas."
                : `Listo. Optimizadas: ${r.hechas} de ${r.total}.` +
                  (r.fallidas ? `\nNo se pudieron optimizar: ${r.fallidas}. Vuelve a pulsar el botón para reintentar.` : "");

            await cargarLista();

        } catch (error) {
            mensajeDrive.textContent = "No se pudo optimizar: " + error.message;

        } finally {
            botonOptimizar.disabled = false;
        }
    });
}

        } catch (error) {

            mensajeDrive.textContent =
                `La importación se detuvo.\n\n` +
                `Fotografías confirmadas como nuevas: ${totalProcesadas}\n` +
                `Duplicadas omitidas: ${totalOmitidas}\n\n` +
                `Motivo: ${error.message}\n\n` +
                `Puedes volver a intentarlo. Los registros existentes se comprobarán antes de insertarlos.`;

            importarDrive.textContent =
                "Reintentar importación";

        } finally {

            importarDrive.disabled = false;

            if (
                importarDrive.textContent !==
                "Reintentar importación"
            ) {
                importarDrive.textContent =
                    "Importar desde Google Drive";
            }
        }
    });
}
// ======================================
// OPTIMIZAR FOTOGRAFÍAS YA SUBIDAS
// ======================================

async function optimizarFotos(escribir) {
    const { data, error } = await db
        .from("relojes")
        .select("id, imagen_url, imagen_ruta");

    if (error) throw error;

    const pendientes = data.filter(r => r.imagen_url && r.imagen_ruta && !r.imagen_ruta.endsWith(".webp"));
    let hechas = 0;
    let fallidas = 0;

    for (const [i, reloj] of pendientes.entries()) {
        escribir(`Optimizando fotografías: ${i + 1} de ${pendientes.length}...`);

        try {
            const respuesta = await fetch(reloj.imagen_url);
            if (!respuesta.ok) throw new Error("No se pudo descargar la foto.");

            const foto = await reducirFoto(await respuesta.blob());
            const ruta = `${Date.now()}-${reloj.id}.webp`;

            const subida = await db.storage
                .from("relojes")
                .upload(ruta, foto, { contentType: "image/webp" });
            if (subida.error) throw subida.error;

            const { data: publica } = db.storage.from("relojes").getPublicUrl(ruta);

            const cambio = await db
                .from("relojes")
                .update({ imagen_url: publica.publicUrl, imagen_ruta: ruta })
                .eq("id", reloj.id);
            if (cambio.error) throw cambio.error;

            await db.storage.from("relojes").remove([reloj.imagen_ruta]);
            hechas++;

        } catch (error) {
            console.error(`No se pudo optimizar el reloj ${reloj.id}:`, error);
            fallidas++;
        }
    }

    return { total: pendientes.length, hechas, fallidas };
}

// Botón para optimizar las fotos que ya estaban subidas
const botonOptimizar = document.getElementById("optimizarFotos");

if (botonOptimizar && mensajeDrive) {
    botonOptimizar.addEventListener("click", async () => {
        botonOptimizar.disabled = true;

        try {
            const r = await optimizarFotos(texto => { mensajeDrive.textContent = texto; });

            mensajeDrive.textContent = r.total === 0
                ? "Todas las fotografías ya estaban optimizadas."
                : `Listo. Optimizadas: ${r.hechas} de ${r.total}.` +
                  (r.fallidas ? `\nNo se pudieron optimizar: ${r.fallidas}. Vuelve a pulsar el botón para reintentar.` : "");

            await cargarLista();

        } catch (error) {
            mensajeDrive.textContent = "No se pudo optimizar: " + error.message;

        } finally {
            botonOptimizar.disabled = false;
        }
    });
}