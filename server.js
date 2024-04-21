const express = require("express");
const cors = require("cors");
const app = express();

var translate = require("node-google-translate-skidz");

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const productos = await fetchProductos();
    productos.forEach((producto) => {
      producto.title = traducir(producto.title);
      producto.description = traducir(producto.description);
    });
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

function traducir(texto) {
  translate(
    {
      text: texto,
      source: "en",
      target: "es",
    },
    function (result) {
      return result;
    }
  );
}

app.listen(3000, () => {
  console.log("Server ejecutando en el port 3000");
});
