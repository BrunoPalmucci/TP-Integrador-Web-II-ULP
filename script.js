async function crearDivProducto() {
  try {
    let container = document.getElementById("container-fluid");
    let row = document.createElement("div");
    row.classList.add("row");

    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    const productos = data.productos;
    const titulo = data.tituloTraducido;
    const descripcion = data.descripcionTraducido;

    productos.forEach((producto) => {
      let productoNuevo = document.createElement("div");
      productoNuevo.classList.add("col-md-3"); //BUSCAR TOOLTIP EN LA DOCUMENTACION DE BOOTSTRAP!!
      productoNuevo.innerHTML = `
        <div class="card">
          <img src="${producto.image}" alt="${producto.title}" class="imagen" />
          <div class="card-body">
            <p class="overflow">${producto.title}</p>
            <p class="overflow">${producto.description}</p> 
            <p class="bottom">$${producto.price}</p>
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

/*async function asignarDescuentos() {
  const response = await fetch("http://localhost:3000/");
  const data = await response.json();
  const descuentosFinal = data.descuentos;
}*/



crearDivProducto();
asignarDescuentos();
