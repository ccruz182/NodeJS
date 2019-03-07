const express = require("express");
require("./src/database/mongoose");

const mascotasRouter = require("./src/routes/mascota");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(mascotasRouter);

app.listen(port, () => {
  console.log("Servidor corriendo en puerto", port);
});
