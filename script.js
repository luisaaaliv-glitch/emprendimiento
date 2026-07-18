// ===============================
// CARRITO DE COMPRAS VANTARA
// ===============================

let carrito = [];

const btnCarrito = document.getElementById("btnCarrito");
const carritoHTML = document.getElementById("carrito");
const listaCarrito = document.getElementById("listaCarrito");
const totalHTML = document.getElementById("total");
const contador = document.getElementById("contador");
const modalCompra = document.getElementById("modalCompra");
const formulario = document.getElementById("formCompra");

// Abrir y cerrar carrito
btnCarrito.addEventListener("click", () => {

    if(carritoHTML.style.right === "0px"){
        carritoHTML.style.right = "-420px";
    }else{
        carritoHTML.style.right = "0px";
    }

});

// Agregar producto
function agregarCarrito(nombre, precio){

    carrito.push({
        nombre,
        precio
    });

    actualizarCarrito();

}

// Actualizar carrito
function actualizarCarrito(){

    listaCarrito.innerHTML="";

    let total = 0;

    carrito.forEach((producto,index)=>{

        total += producto.precio;

        listaCarrito.innerHTML += `

        <div style="margin-bottom:18px;border-bottom:1px solid #ddd;padding-bottom:10px;">

            <strong>${producto.nombre}</strong>

            <br>

            $${producto.precio.toLocaleString()}

            <br><br>

            <button onclick="eliminarProducto(${index})"
            style="background:#b22222;color:white;border:none;padding:6px 15px;border-radius:6px;cursor:pointer;">
            Eliminar
            </button>

        </div>

        `;

    });

    totalHTML.innerHTML="$"+total.toLocaleString();

    contador.innerHTML=carrito.length;

}

// Eliminar producto
function eliminarProducto(indice){

    carrito.splice(indice,1);

    actualizarCarrito();

}

// Abrir formulario
function abrirCompra(){

    if(carrito.length===0){

        alert("El carrito está vacío.");

        return;

    }

    modalCompra.style.display="flex";

}

// Enviar formulario
formulario.addEventListener("submit",function(e){

    e.preventDefault();

    alert(
`¡Confirma el pago a través de tu cuenta bancaria para un envío exitoso!

    );

    carrito=[];

    actualizarCarrito();

    modalCompra.style.display="none";

    formulario.reset();

});

// Cerrar modal haciendo clic fuera
window.addEventListener("click",function(e){

    if(e.target===modalCompra){

        modalCompra.style.display="none";

    }

});