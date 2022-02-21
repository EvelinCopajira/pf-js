//accedo a los elementos por className
const cuidadoFacialContainer = document.querySelector(".cuidado-facial-container");

//accedo al btn a traves del type
const btnAgregar = document.querySelector("[type=button]");


//array con datos de objetos disponibles (variables) - 
const productosCuidadosFaciales = [{
        nombre: "ecopads",
        precio: 50,
        sku: "TIC-0001",
        img: '../multimedia/fotos/webp/fotos-secciones/pads2.webp'
    },
    {
        nombre: "toallas faciales",
        precio: 200,
        sku: "TIC-0002",
        img: '../multimedia/fotos/webp/fotos-secciones/toalla1.webp'
    },
    {
        nombre: "vinchas",
        precio: 300,
        sku: "TIC-0003",
        img: '../multimedia/fotos/webp/fotos-secciones/vinchas2-cuadrado.webp'
    },
    {
        nombre: "kits",
        precio: 100,
        sku: "TIC-0004",
        img: '../multimedia/fotos/webp/fotos-secciones/set2.webp'
    }
];

//funcion para mostrar los producto
mostrarProductos();

function mostrarProductos() {
    productosCuidadosFaciales.forEach(function (productoCuidadoFacial) {
        //scripting - agrego elementos al HTML
        const divProducto = document.createElement('div');
        //agrego class al elemento y le asocio el style
        divProducto.classList.add("prod-container");

        const divImagen = document.createElement('div');

        const imgProducto = document.createElement('img');
        imgProducto.src = productoCuidadoFacial.img;
        imgProducto.classList.add("img-producto");

        const nombreProducto = document.createElement('h3');
        nombreProducto.textContent = productoCuidadoFacial.nombre;

        const skuProducto = document.createElement('p');
        skuProducto.textContent = `Sku: ${productoCuidadoFacial.sku}`;

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `$${productoCuidadoFacial.precio}`;

        const cantidadesAgregadas = document.createElement ('div');

        const selectCantidades = document.createElement('select');
        let cantidades = [1, 2, 3, 4, 5];

        for (const iterator of cantidades) {
            let options = `<option value="${iterator}">${iterator}</option>`;
            selectCantidades.innerHTML += options;
        }

        const btnAgregar = document.createElement('button');
        btnAgregar.textContent = "AGREGAR";
        btnAgregar.classList.add('btn-agregar');


        divImagen.appendChild(imgProducto);
        divProducto.appendChild(divImagen);
        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(skuProducto);
        divProducto.appendChild(precioProducto);
        cantidadesAgregadas.appendChild(selectCantidades);
        cantidadesAgregadas.appendChild(btnAgregar);
        divProducto.appendChild(cantidadesAgregadas);

        cuidadoFacialContainer.appendChild(divProducto);
    })
};