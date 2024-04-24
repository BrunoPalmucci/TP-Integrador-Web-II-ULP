async function crearDivProducto() {
  try {
    let container = document.getElementById("container-fluid");
    let row = document.createElement("div");
    row.classList.add("row");

    const productos = {};

    for (let key in localStorage) {
      if (key === undefined || key === null) {
      } else {
        try {
          productos[key] = JSON.parse(localStorage[key]);
        } catch (e) {
          productos[key] = localStorage[key];
        }
      }
    }
    Object.entries(productos).forEach(([key, producto]) => {
      if (producto.price !== undefined) {
        const descuento = producto.hasOwnProperty("descuento");
        if (!descuento) {
          let productoNuevo = document.createElement("div");
          productoNuevo.classList.add("col-md-3"); //BUSCAR TOOLTIP EN LA DOCUMENTACION DE BOOTSTRAP!!
          productoNuevo.innerHTML = `
        <div class="card">
          <img src="${producto.image}" alt="${producto.title}" class="imagen" />
          <div class="card-body">
            <p class = "hidden-id">${producto.id}</p>
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
            let card1 = document.querySelector(".hidden-id")
            let id = card1.innerHTML
            let productoAEnviar = localStorage.getItem(id)
            if (productoAEnviar && typeof productoAEnviar !== 'object') {
                productoAEnviar = JSON.parse(productoAEnviar);
            }
            console.log(productoAEnviar)
            fetch('/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoAEnviar)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Producto enviado:', data);
            })
            .catch(error => {
                console.error('Error sending producto:', error);
            });
          });
          card.appendChild(boton);

          let botonEliminar = document.createElement("button");
          botonEliminar.className = "btn btn-danger top";
          botonEliminar.textContent = "Eliminar";
          botonEliminar.type = "button";
          botonEliminar.addEventListener("click", function () {});
          card.appendChild(boton);
          card.appendChild(botonEliminar);

          row.appendChild(productoNuevo);

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
                    producto.price -
                      (producto.price / 100) * producto.descuento,
                    2
                  )}</p>
                </div>
              </div>`;

          let card = productoNuevo.querySelector(".card");
          let boton = document.createElement("button");
          boton.className = "btn btn-warning bottom";
          boton.textContent = "Comprar";
          boton.type = "button";
          boton.addEventListener("click", function () {
            fetch('/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Producto enviado:', data);
            })
            .catch(error => {
                console.error('Error sending producto:', error);
            });
          });
          card.appendChild(boton);

          let botonEliminar = document.createElement("button");
          botonEliminar.className = "btn btn-danger top";
          botonEliminar.textContent = "Eliminar";
          botonEliminar.type = "button";
          botonEliminar.addEventListener("click", function () {});
          card.appendChild(boton);
          card.appendChild(botonEliminar);
          row.appendChild(productoNuevo);
        }
      }
    });

    container.appendChild(row);
  } catch (error) {
    console.error("Error al crear div:", error);
  }
}

truncateDecimals = function (number, digits) {
  let multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};
crearDivProducto();
