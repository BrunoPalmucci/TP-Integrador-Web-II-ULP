const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("node:fs");

var translate = require("node-google-translate-skidz");

app.use(cors());

const descuentos = require("./descuentos.json");

app.get("/productos", async (req, res) => {
  let productos = await fetchProductos();
  try {
    const promises = productos.map(async (producto) => {
      const tituloTraducido = await traducir(producto.title);
      const descripcionTraducido = await traducir(producto.description);

      producto.title = tituloTraducido.translation;
      producto.description = descripcionTraducido.translation;
      //HACER EL DESCUENTO ACA. AGREGAR CAMPOS!!
      let idP = producto.id;
      let tieneId = descuentos.descuentos.some(
        (item) => item.idProducto === idP
      );

      if (tieneId) {
        for (let i = 0; i < descuentos.descuentos.length; i++) {
          producto["descuento"] = descuentos.descuentos[i].descuento;
          console.log(producto);
        }
      }
      return producto;
    });

    await Promise.all(promises);
    res.json({
      productos: productos,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

async function fetchProductos() {
  try {
    var respuesta = await fetch("https://fakestoreapi.com/products");
    var objecto = await respuesta.json();
    return objecto;
  } catch (error) {
    console.error("Error al fetchear:", error);
    throw error;
  }
}

async function traducir(texto) {
  return new Promise((resolve, reject) => {
    translate(
      {
        text: texto,
        source: "en",
        target: "es",
      },
      function (result) {
        if (result && result.translation) {
          resolve({ translation: result.translation });
        } else {
          reject("Error en la traducción");
        }
      }
    );
  });
}
/*async function descontar(id) {
  let productos = await fetchProductos()
  let descuentoAplicable = 0;
  let precioProducto = 0;

  for (let i = 0; i < descuentos.length; i++) {
    if (descuentos[i].idProducto == id) {
      descuentoAplicable = descuentos[i].descuento;
    }
  }
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id == id) {
      precioProducto = productos[i].price;
    }
  }
  let descuentoTotal = precioProducto * (descuentoAplicable / 100);
  let precioFinal = precioProducto - descuentoTotal;
  return precioFinal;
}*/

app.listen(3000, () => {
  console.log("Server ejecutando en el port 3000");
});
