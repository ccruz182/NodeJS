const express = require("express");

const Mascota = require("../database/models/mascota");

const router = new express.Router();

// Adición de un nuevo peril de una mascota
router.post("/mascotas", (req, res) => {
  const mascota = new Mascota(req.body);
  console.log("**M**", req.body);
  mascota
    .save()
    .then(doc => {      
      res.send(doc);
    })
    .catch(error => {
      console.log(error);
      res
        .status(400)
        .send({ error: "No se pudo crear el perfil de la mascota" });
    });
});

// Se obtienen todos los perfiles de las mascotas registradas
router.get("/mascotas", (req, res) => {
  Mascota.find({})
    .then(mascotas => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
      res.send(mascotas);
    })
    .catch(error => {
      res.status(500).send({ error: "No se pudieron recuperar las mascotas" });
    });
});

// Se obtienen las n mascotas, asociadas a un correo
router.get("/mascota", (req, res) => {
  const { correo } = req.query;

  Mascota.find({ correo })
    .then(mascotas => {
      res.send(mascotas);
    })
    .catch(error => {
      res.status(500).send({ error: "No se pudieron recuperar las mascotas" });
    });
});

// Se actualiza un perfil de mascota.
router.patch("/mascotas/:id", (req, res) => {
  Mascota.findByIdAndUpdate(req.params.id, req.body)
    .then(mascota => {
      res.send(mascota);
    })
    .catch(error => {
      res.status(500).catch({ error: "No se pudo actualizar el perfil" });
    });
});

router.delete("/mascotas/:id", async (req, res) => {
  Mascota.findByIdAndDelete(req.params.id)
    .then(borrado => {
      res.send(borrado);
    })
    .catch(error => {      
      res.status(500).send({ error: "No se pudo eliminar el perfil" });
    });
});

module.exports = router;
