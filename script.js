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
      const descuento = producto.hasOwnProperty("descuento");
      if (!descuento) {
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
      } else {
        console.log("Funciona!!");
        let productoNuevo = document.createElement("div");
        productoNuevo.classList.add("col-md-3"); //BUSCAR TOOLTIP EN LA DOCUMENTACION DE BOOTSTRAP!!
        productoNuevo.innerHTML = `
            <div class="card">
              <img src="${producto.image}" alt="${
          producto.title
        }" class="imagen" />
              <div class="card-body">
              <div class = "oferta">
                <p>En oferta</p>
                <p>${producto.descuento}%</p>
              </div>
                <p class="overflow">${producto.title}</p>
                <p class="overflow">${producto.description}</p> 
                <p class="bottom precioOferta">$${producto.price}</p>
                <p class="bottom-right">$${truncateDecimals(
                  producto.price - (producto.price / 100) * producto.descuento,
                  2
                )}</p>
              </div>
              <button type="button" class="btn btn-warning bottom">Comprar</button>
            </div>`;

        row.appendChild(productoNuevo);
      }
    });
    /*if (!descuento) {
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
    } else {
      productos.forEach((producto) => {
        console.log("Funciona!!")
        let productoNuevo = document.createElement("div");
        productoNuevo.classList.add("col-md-3"); //BUSCAR TOOLTIP EN LA DOCUMENTACION DE BOOTSTRAP!!
        productoNuevo.innerHTML = `
          <div class="card">
            <img src="${producto.image}" alt="${
          producto.title
          }" class="imagen" />
            <div class="card-body">
            <div class = "oferta">
              <p>En oferta</p>
            </div>
              <p class="overflow">${producto.title}</p>
              <p class="overflow">${producto.description}</p> 
              <p class="bottom precioOferta">$${
                (producto.price, producto.descuento)
              }</p>
            </div>
            <button type="button" class="btn btn-warning bottom">Comprar</button>
          </div>`;

        row.appendChild(productoNuevo);
      });
    }*/

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
truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};
crearDivProducto();
