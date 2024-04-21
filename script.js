//let funciones = require("server.js")
//let traducir = funciones.translate()
async function crearDivProducto() {
  try {
    let container = document.getElementById("container-fluid");
    let row = document.createElement("div");
    row.classList.add("row");

    // Fetch data from server
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    const productos = data.productos;
    const titulo = data.tituloTraducido
    const descripcion = data.descripcionTraducido
//tituloTraducido,
//descripcionTraducido,
    productos.forEach((producto) => {
      let productoNuevo = document.createElement("div");
      productoNuevo.classList.add("col-md-3");
      productoNuevo.innerHTML = `
        <div class="card">
          <img src="${producto.image}" alt="${producto.title}" class="imagen" />
          <div class="card-body">
            <p class="overflow">${producto.title}</p>
            <p class="overflow">${producto.description}</p>
            <p class="bottom">${producto.price}$</p>
          </div>
          <button type="button" class="btn btn-warning bottom">Comprar</button>
        </div>`;

      row.appendChild(productoNuevo);
    });

    container.appendChild(row);
  } catch (error) {
    console.error("Error al crear div:", error);
  }
}

/*function truncarTexto(texto, largoMax, minimo) {
  if (texto.length > largoMax) {
    return texto.substring(minimo, largoMax);
  }
  return texto;
}*/

crearDivProducto();
