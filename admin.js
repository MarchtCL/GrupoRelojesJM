
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const login = document.getElementById("login");
const panel = document.getElementById("panel");
const salir = document.getElementById("salir");
const formReloj = document.getElementById("formReloj");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const mensajeLogin = document.getElementById("mensajeLogin");

const formatoPrecio = precio =>
    Number(precio).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });

// MOSTRAR LOGIN O PANEL
function mostrarPanel(haySesion) {
    login.hidden = haySesion;
    panel.hidden = !haySesion;
    salir.hidden = !haySesion;

    if (haySesion) cargarLista();
}

// REDUCIR FOTOGRAFÍA
function reducirFoto(archivo, maximo = 1000) {
    return new Promise((ok, fallo) => {
        if (!archivo) {
            fallo(new Error("Selecciona una fotografía."));
            return;
        }

        const img = new Image();

        img.onload = () => {
            const k = Math.min(1, maximo / Math.max(img.width, img.height));

            const lienzo = document.createElement("canvas");
            lienzo.width = Math.round(img.width * k);
            lienzo.height = Math.round(img.height * k);

            lienzo.getContext("2d").drawImage(
                img, 0, 0, lienzo.width, lienzo.height
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
        mensaje.textContent = "No se pudo cerrar sesión: " + error.message;
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
        mensaje.textContent = "No se pudo guardar: " + error.message;

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
        lista.textContent = "No se pudo cargar la lista: " + error.message;
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
        `${reloj.marca} · ${reloj.modelo} · ${reloj.garantia}`;

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
            console.error("No se pudo eliminar la fotografía:", errorFoto);
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
