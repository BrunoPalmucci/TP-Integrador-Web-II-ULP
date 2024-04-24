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
      </div>`;

      let card = productoNuevo.querySelector(".card");
        let boton = document.createElement("button");
        boton.className = "btn btn-warning bottom";
        boton.textContent = "Comprar";
        boton.type = "button";
        boton.addEventListener("click", function () {
          console.log("Funciona el boton");
          localStorage.setItem(producto.id, JSON.stringify(producto));
        });
        card.appendChild(boton);

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
            </div>`;
        let cardBody = productoNuevo.querySelector(".card");
        let boton = document.createElement("button");
        boton.className = "btn btn-warning bottom";
        boton.textContent = "Comprar";
        boton.type = "button";
        boton.addEventListener("click", function () {
          console.log("Funciona el boton");
          localStorage.setItem(producto.id, JSON.stringify(producto));
        });
        cardBody.appendChild(boton);

        row.appendChild(productoNuevo);
      }
    });

    container.appendChild(row);
  } catch (error) {
    console.error("Error al crear div:", error);
  }
}

function agregarACarrito() {
  const boton = document.querySelectorAll(".btn btn-warning bottom");
  botones.forEach((boton) => {
    const parentDiv = event.currentTarget.parentElement;

    const divInfo = parentDiv.getAttribute("data-info");

    const children = Array.from(parentDiv.children).map(
      (child) => child.textContent
    );

    console.log(`boton clicked in div with info: ${divInfo}`);
  });
}

truncateDecimals = function (number, digits) {
  let multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};
crearDivProducto();
