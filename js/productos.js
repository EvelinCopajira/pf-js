//accedo a los elementos con querySelector y los guardo en variables globales
const cuidadoFacialContainer = document.querySelector(".cuidado-facial-container"),
    carritoContainer = document.querySelector(".carrito-container"),
    contadorCarrito = document.querySelector(".contador-carrito"),
    sumaTotal = document.querySelector(".suma-total"),
    btnFinalizarCompra = document.querySelector("#btn-confirmar-compra"),
    btnValidar = document.querySelector('#btn-validar-datos');

//array vacío para pushear productos agregados
let carritoCompras = [];

//array con datos de objetos disponibles (variables) 
let productosCuidadosFaciales = null;
fetch("../lista-productos.json")
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);

        productosCuidadosFaciales = data;
        mostrarProductos();
        recuperarStorage();
    })


//funcion para mostrar todos los productos
function mostrarProductos() {
    //for of para recorrer el array y generar las cards de productos
    for (const producto of productosCuidadosFaciales) {
        let divProducto = document.createElement("div"); //scripting - agrego elementos al HTML        
        divProducto.classList.add("prod-container"); //agrego class al elemento y le asocio el style

        //genero contenido dinamicamente - template
        divProducto.innerHTML +=
            `<h3>${producto.nombre}</h3>
        <div>
            <img class="img-producto" src=${producto.img}>                               
        </div>
        <p>SKU: ${producto.sku} <br/> PRECIO: $${producto.precio}</p>
        <div>
            <button class="btn-agregar ${producto.sku}">AGREGAR</button>
        </div>`

        //agrego el divProducto al container
        cuidadoFacialContainer.appendChild(divProducto);

        //individualizo cada boton agregar segun su sku
        let btnAgregar = document.getElementsByClassName(`btn-agregar ${producto.sku}`)[0];

        //eventListener click btnAgregar
        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.sku)
            Toastify({
                text: "Agregaste un producto al carrito",
                duration: 3000,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover

                style: {
                    background: "#f6e7d8",
                    color: "black"
                },
                onClick: function () {} // Callback after click
            }).showToast();
        })
    }
};

//funcion agregar al carrito
function agregarAlCarrito(sku) {
    //creo una variable para poder buscar en el carritoCompras si el sku ya fue agregado antes
    let repetidos = carritoCompras.find(buscar => buscar.sku === sku);

    //creo un condicional para que si lo encuentra los sume, sino lo agregue
    if (repetidos) {
        //si encuentra el sku (true) agrego uno a la cantidad y reasigno el valor de repetidos.cantidad
        repetidos.cantidad = repetidos.cantidad + 1;

        //busco de repetidos.sku la cantidad y modifico con HTML la linea de codigo p
        document.getElementsByClassName(`cantidad ${repetidos.sku}`)[0].innerHTML = `<p class="cantidad ${repetidos.sku}">${repetidos.cantidad}</p>`;

        //ejecuto la funcion actualizarCarrito
        actualizarCarrito();
    } else {
        //creo una variable para buscar el producto que tenga el sku estrictamente igual al sku que ejecuta el eventListener
        let productoAgregar = productosCuidadosFaciales.find(producto => producto.sku === sku);

        //agrego productos al array vacio
        carritoCompras.push(productoAgregar);

        //ejecuto la funcion cada vez que agrego un producto al carrito, actualizo el contador
        actualizarCarrito();

        let divCarrito = document.createElement("div"); //scripting - agrego elementos al HTML        
        divCarrito.classList.add("prod-en-carrito"); //agrego class al elemento y le asocio el style

        //genero contenido dinamicamente - template
        divCarrito.innerHTML +=
            `
            <div>
            <p>${productoAgregar.nombre}</p>
        <p>$${productoAgregar.precio}</p>
        <p class="cantidad ${productoAgregar.sku}">${productoAgregar.cantidad}</p>
        <button class="btn-eliminar ${productoAgregar.sku}"><i class="fas fa-trash-alt"></i></button>
            </div>`


        //agrego el div al container
        carritoContainer.appendChild(divCarrito);

        //individualizo cada boton eliminar segun su sku
        let btnEliminar = document.getElementsByClassName(`btn-eliminar ${productoAgregar.sku}`)[0];

        //eventListener
        btnEliminar.addEventListener('click', () => {

            //condicional para que no borre todas las cantidades con el btnEliminar, sino de una
            if (productoAgregar.cantidad === 1) {
                //busco el padre del elemento para poder eliminar todo, tambien en HTML
                btnEliminar.parentElement.remove();

                //modifico el array vacio. Filtro los sku's que sean distintos del sku que hizo click en btnEliminar y genero un array nuevo con los que quedan
                carritoCompras = carritoCompras.filter(producto => producto.sku != productoAgregar.sku);

                //ejecuto funcion para que al eliminar se actualice el total y tambien el contador
                actualizarCarrito();

                //guardo modificaciones en localStorage
                localStorage.setItem("carrito", JSON.stringify(carritoCompras));
            } else {
                //si encuentra el sku (true) elimino uno a la cantidad y reasigno el valor de repetidos.cantidad
                productoAgregar.cantidad = productoAgregar.cantidad - 1;

                //busco de productoAgregar.sku la cantidad y modifico con HTML la linea de codigo p
                document.getElementsByClassName(`cantidad ${productoAgregar.sku}`)[0].innerHTML = `<p class="cantidad ${productoAgregar.sku}">${productoAgregar.cantidad}</p>`;

                //ejecuto la funcion actualizarCarrito para modificar a medida que resto
                actualizarCarrito();

                //guardo modificaciones en localStorage
                localStorage.setItem("carrito", JSON.stringify(carritoCompras));
            }

        })
    }
    //guardo los cambios en localStorage, se guardan como string
    localStorage.setItem("carrito", JSON.stringify(carritoCompras));
};

//funcion actualizar carrito
function actualizarCarrito() {
    //actualizo la cantidad en el contador
    contadorCarrito.innerText = carritoCompras.reduce((acc, el) => acc + el.cantidad, 0);

    //actualizo la suma del total en $
    sumaTotal.innerText = carritoCompras.reduce((acc, el) => acc + (el.cantidad * el.precio), 0);
};

//funcion STORAGE
function recuperarStorage() {
    //parseo el string para convertirlo
    let recuperarLocalStorage = JSON.parse(localStorage.getItem("carrito"));

    //para evitar el null en un array vacio, recorro con un forEach para que a cada elemento le ejecute la funcion agregar al carrito con el parametro sku y genero un condicional
    if (recuperarLocalStorage) {
        recuperarLocalStorage.forEach(element => {
            agregarAlCarrito(element.sku)
        });
    }
};


//formulario
const nombre = document.querySelector(".name"),
    mail = document.querySelector(".mail"),
    formulario = document.querySelectorAll(".formulario-compra"),
    mensaje = document.querySelector(".mensaje-error");


btnFinalizarCompra.addEventListener('click', () => {
    //verifico que el carrito no esta vacio y puedo finalizar la compra
        if (carritoCompras.length === 0) {
            //si esta vacio muestra msj de error con toastify
            Toastify({
                text: "Tu carrito está vacío",
                duration: 3000,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover

                style: {
                    background: "orange",
                    color: "black"
                },
                onClick: function () {} // Callback after click
            }).showToast();
            return;
        }
        //elimina el msj de error
        mensaje.innerText = "";

        //la funcion devuelve objeto con los campos invalidos
        const validacion = validarDatos();

        //la funcion devuelve undefined si los campos son validos
        if (validacion === undefined) {
            succesAlert();
            return
        }

        //en caso de tener campos invalidos tomo los keys del objeto (que son los campos invalidos)
        failAlert(Object.keys(validacion));
    }
);

//funcion para mostrar un msj de confirmacion de compra
function succesAlert() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu compra fue confirmada',
        showConfirmButton: true
    }).then((result) => {
        //al cerrar el msj de confirmacion se elimina el local storage y se redirije al index
        localStorage.clear();
        window.location.href = "../index.html"
    })
};

//funcion para mostrar un msj de error con los campos invalidos
function failAlert(camposErroneos) {
    //camposErroneos es una lista con los campos invalidos
    mensaje.innerText = "Revise los datos ingresados"
    camposErroneos.forEach((campo) => {
        mensaje.innerText += "\n'" + campo + "' es invalido";
    })

};

//funcion que toma los inputs y los valida - libreria: https://validatejs.org
function validarDatos() {
    const constraints = {
        "Nombre y Apellido": {
            presence: {
                allowEmpty: false
            }
        },
        "E-mail": {
            email: true
        }
    };

    return validate({
        "Nombre y Apellido": nombre.value,
        "E-mail": mail.value
    }, constraints);
};