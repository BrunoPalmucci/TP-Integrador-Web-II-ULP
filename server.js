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

      let idP = producto.id;
      let tieneId = descuentos.descuentos.some(
        (item) => item.idProducto === idP
      );

      if (tieneId) {
        for (let i = 0; i < descuentos.descuentos.length; i++) {
          if (idP == descuentos.descuentos[i].idProducto) {
            producto["descuento"] = descuentos.descuentos[i].descuento;
          }
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

app.listen(3000, () => {
  console.log("Server ejecutando en el port 3000");
});
