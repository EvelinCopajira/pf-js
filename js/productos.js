//accedo a los elementos por className
const cuidadoFacialContainer = document.querySelector(".cuidado-facial-container");


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
        skuProducto.textContent= `Sku: ${productoCuidadoFacial.sku}`;

        const precioProducto = document.createElement ('p');
        precioProducto.textContent= `$${productoCuidadoFacial.precio} + IVA (21%)`;
        
        const selectCantidades = document.createElement('select');

        divImagen.appendChild(imgProducto);
        divProducto.appendChild(divImagen);
        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(skuProducto);
        divProducto.appendChild(precioProducto);
        divProducto.appendChild(selectCantidades);
        cuidadoFacialContainer.appendChild(divProducto);
    })
};

//array cantidad
const selectCantidades = [1,2,3,4,5];

//itero el array listadoProductos para generar las opciones del select


//función para ser llamada con el evento listener
function seleccion() {
    //agrego el producto seleccionado al carritoCompras
    carritoCompras.push(producto);
};

//evento listener para mostrar en pantalla la selección del usuario
btnAgregar.addEventListener("click", seleccion);