window.addEventListener('DOMContentLoaded', function () {
            let btnPeticion = document.getElementById('btnPedir');
            let inputMonstruo = document.getElementById('numeroMonstruo');
            let imgMonstruo = document.getElementById('imagenMonstruo');
            let divInfo = document.getElementById('infoMonstruo');

            btnPeticion.addEventListener('click', pedirMonstruo);


            function pedirMonstruo() {
                let nombreMonstruo = inputMonstruo.value;

                fetch(`https://monsterhunterapi.onrender.com/mhapi/monstruos/` + nombreMonstruo)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Monstruo no encontrado');
                        }
                        return res.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        mostrarDatos(data);
                    })
                    .catch(function (error) {
                        console.error(error);
                        mostrarError();
                    });
            }



            function mostrarDatos(data) {

                // Imagen, Nombre y ID
                    let urlImagen = data.icono;
                    let nombre = data.nombre.toUpperCase();
                    let id = data.id;



                // Clase
                    let clase = data.clase?.nombre || "No disponible";



                // Elementos
                    let elementoHTML = '<p><strong>Elemento(s):</strong></p>';
                    if (data.elemento && data.elemento.length > 0) {
                        data.elemento.forEach(elem => {
                            elementoHTML += `
                                <p>${elem.nombre}</p>
                                <img src="${elem.icono}" alt="${elem.nombre}" style="max-width: 100px;">
                            `;
                        });
                    } else {
                        elementoHTML += "<p>No tiene elemento</p>";
                    }


                // Estados
                    let estadoHTML = '<p><strong>Estado(s):</strong></p>';
                    if (data.estado && data.estado.length > 0) {
                        data.estado.forEach(est => {
                            estadoHTML += `
                                <p>${est.nombre}</p>
                                <img src="${est.icono}" alt="${est.nombre}" style="max-width: 100px;">
                            `;
                        });
                    } else {
                        estadoHTML += "<p>No tiene estados</p>";
                    }


                // Debilidades
                    let debilidadHTML = '<p><strong>Debilidad(es):</strong></p>';
                    if (data.debilidad && data.debilidad.length > 0) {
                        data.debilidad.forEach(deb => {
                            debilidadHTML += `
                                <p>${deb.nombre}</p>
                                <img src="${deb.icono}" alt="${deb.nombre}" style="max-width: 100px;">
                            `;
                        });
                    } else {
                        debilidadHTML += "<p>No tiene debilidades</p>";
                    }



                // Tamaños
                    let maxSize = data.max_size ? data.max_size.toFixed(2) + " cm" : "No disponible";
                    let minSize = data.min_size ? data.min_size.toFixed(2) + " cm" : "No disponible";




                // Mostrar imagen principal
                    imgMonstruo.src = urlImagen;
                    imgMonstruo.alt = nombre;



                // Dentro HTML
                    divInfo.innerHTML = `
                        <p><strong>${id}</strong></p>
                        <p><strong>${nombre}</strong></p>
                        <p><strong>${clase}</strong></p>
                        ${elementoHTML}
                        ${estadoHTML}
                        ${debilidadHTML}
                        <p><strong>Tamaño mínimo:</strong> ${minSize}</p>
                        <p><strong>Tamaño máximo:</strong> ${maxSize}</p>
                    `;
    }




            function mostrarError() {
                let urlImagen = `https://media.tenor.com/tumf9em1c9AAAAAM/dancing-focas.gif`;

                imgMonstruo.src = urlImagen;
                imgMonstruo.alt = "Monstruo no encontrado";

                divInfo.innerHTML = `
                    <p><strong>No Existe</strong></p>
                `;
            }
        });