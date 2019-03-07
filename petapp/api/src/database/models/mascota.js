const mongoose = require("mongoose");

const Mascota = mongoose.model("Mascota", {
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: String,
    required: true,
    trim: true
  },
  especie: {
    type: String,
    required: true,
    trim: true
  },
  raza: {
    type: String,
    trim: true
  },
  fechaNacimiento: {
    type: String
  },
  correo: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  }
});

module.exports = Mascota;
