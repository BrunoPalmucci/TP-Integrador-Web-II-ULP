async function respuesta() {
  try {
    var respuesta = await fetch("https://fakestoreapi.com/products");
    var objecto = await respuesta.json();
    return objecto;
  } catch (error) {
    console.error("Error al fetchear:", error);
    throw error;
  }
}

async function crearDivProducto() {
  try {
    const productos = await respuesta();
    let container = document.getElementById("container-fluid");

    let row = document.createElement("div");
    row.classList.add("row");

    productos.forEach((producto) => {
      let productoNuevo = document.createElement("div");
      productoNuevo.classList.add("col-md-3");
      productoNuevo.innerHTML = `
        <div class="card">
          <img src="${producto.image}" alt="${producto.title}" class="imagen" />
          <div class="card-body">
            <p>${producto.title}</p>
            <p>${truncarTexto(producto.description, 30)}</p>
            <p>${producto.price}</p>
          </div>
          <button type="button" class="btn btn-warning">Comprar</button>
        </div>`;

      row.appendChild(productoNuevo);
    });

    container.appendChild(row);
  } catch (error) {
    console.error("Error al crear div:", error);
  }
}

function truncarTexto(texto, largoMax) {
  if (texto.length > largoMax) {
    return texto.substring(0, largoMax) + "...";
  }
  return text;
}

crearDivProducto();
