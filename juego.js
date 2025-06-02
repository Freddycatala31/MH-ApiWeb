window.addEventListener('DOMContentLoaded', () => {
    const imgMonstruo = document.getElementById('imagenMonstruo');
    const input = document.getElementById('respuestaMonstruo');
    const btn = document.getElementById('verificar');
    const feedback = document.getElementById('feedback');
    const datalist = document.getElementById('listaMonstruos');
    const emoji = document.getElementById('emojiFeedback');

    let monstruos = [];
    let monstruoActual = null;

    // Obtener todos los monstruos al inicio
    fetch('https://monsterhunterapi.onrender.com/mhapi/monstruos/')
        .then(res => res.json())
        .then(data => {
            console.log("Monstruos cargados:", data);
            monstruos = data;
            llenarDatalist(data);
            mostrarMonstruoAleatorio();
        })
        .catch(err => {
            feedback.textContent = "Error cargando los monstruos.";
            console.error(err);
        });

    // Llenar el datalist para autocompletar
    function llenarDatalist(data) {
        data.forEach(monstruo => {
            const option = document.createElement('option');
            option.value = monstruo.nombre;
            datalist.appendChild(option);
        });
    }

    // Mostrar un monstruo aleatorio
    function mostrarMonstruoAleatorio() {
        input.value = "";
        feedback.textContent = "";

        const randomIndex = Math.floor(Math.random() * monstruos.length);
        monstruoActual = monstruos[randomIndex];

        // Mostrar gif de carga temporal
        imgMonstruo.src = "loading.gif";
        imgMonstruo.alt = "Cargando monstruo...";

        // Precargar imagen real
        const nuevaImagen = new Image();
        nuevaImagen.onload = () => {
            imgMonstruo.src = monstruoActual.icono;
            imgMonstruo.alt = monstruoActual.nombre;
        };
        nuevaImagen.onerror = () => {
            feedback.textContent = "No se pudo cargar la imagen del monstruo.";
        };
        nuevaImagen.src = monstruoActual.icono;
    }

    // Verificar respuesta del usuario
    btn.addEventListener('click', () => {
        const respuesta = input.value.trim().toLowerCase();
        const nombreCorrecto = monstruoActual.nombre.trim().toLowerCase();

        if (respuesta === nombreCorrecto) {
            feedback.textContent = "¡Correcto! Buscando otro monstruo...";
            emoji.src = "good-removebg-preview.png"; // imagen de acierto
            setTimeout(() => {
                emoji.src = "st_small_845x845-pad_1000x1000_f8f8f8.u2-removebg-preview.png";
            }, 1500);
            setTimeout(mostrarMonstruoAleatorio, 1500);
        } else {
            feedback.textContent = "Nombre incorrecto. Intenta otra vez.";
        }
    });
});
