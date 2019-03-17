import React, { Component } from "react";
import { Button, Card, Form } from "semantic-ui-react";
import axios from "axios";
import validator from "validator";

import EspecieSelector from "./EspecieSelector";
import ModalError from "../utils/ModalError";
import ModalOk from "../utils/ModalOk";

import { baseURL } from "../../datos-servidor/datos";
import MensajeDatosIncompletos from "./MensajeDatosIncompletos";

class NuevaMascota extends Component {
  state = {
    nombre: "",
    genero: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    correo: "",
    telefono: "",
    mostrarModal: false,
    mostrarError: false,
    datosIncompletos: false,
    errorMsg: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  cerrarModal = () => {
    this.setState({
      nombre: "",
      genero: "",
      especie: "",
      raza: "",
      fechaNacimiento: "",
      correo: "",
      telefono: "",
      mostrarModal: false
    });

    this.props.history.push("/");
  };

  cerrarError = () => {
    this.setState({ mostrarError: false });
  };

  agregarMascota = () => {
    const {
      nombre,
      genero,
      especie,
      raza,
      fechaNacimiento,
      correo,
      telefono
    } = this.state;

    /* Validación de campos */
    let errorMsg = "";
    if (!validator.isEmail(correo)) {
      errorMsg = "El correo electrónico ingresado no es válido";
    }

    if (
      validator.isEmpty(nombre) &
      validator.isEmpty(genero) &
      validator.isEmpty(especie)
    ) {
      errorMsg = "Hay campos vacíos. Favor de llenarlos";
    }

    if (!validator.isNumeric(telefono)) {
      errorMsg = "El número telefónico ingresado no es válido";
    }

    if (!validator.isEmpty(errorMsg)) {
      console.log("e", errorMsg);
      this.setState({ datosIncompletos: true, errorMsg });
      return;
    }

    axios
      .post(`${baseURL}/mascotas`, {
        nombre,
        genero,
        especie,
        raza,
        fechaNacimiento,
        correo,
        telefono
      })
      .then(res => {
        this.setState({ mostrarModal: true });
      })
      .catch(error => {
        alert(error);
        this.setState({ mostrarError: true });
      });
  };

  render() {
    const {
      nombre,
      genero,
      raza,
      fechaNacimiento,
      correo,
      telefono,
      mostrarModal,
      mostrarError
    } = this.state;

    let mensajeDatosIncompletos = (
      <MensajeDatosIncompletos mensaje={this.state.errorMsg} />
    );

    if (!this.state.datosIncompletos) {
      mensajeDatosIncompletos = null;
    }

    return (
      <div>
        <ModalOk titulo="Se agregó la mascota correctamente!" estado={mostrarModal} cerrar={this.cerrarModal} />
        <ModalError estado={mostrarError} cerrar={this.cerrarError} />
        <Card fluid>
          <Card.Content>
            <Card.Header>
              <center>Ingresa los datos solicitados</center>
            </Card.Header>
          </Card.Content>
          <div style={{ padding: "3%" }}>
            <Form onSubmit={this.agregarMascota}>
              <Form.Input
                name="nombre"
                fluid
                label="Nombre de la mascota"
                placeholder="Nombre de la mascota"
                onChange={this.handleChange}
                value={nombre}
              />

              <Form.Group inline>
                <label>Género</label>
                <Form.Radio
                  name="genero"
                  label="Hembra"
                  value="Hembra"
                  checked={genero === "Hembra"}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  name="genero"
                  label="Macho"
                  value="Macho"
                  checked={genero === "Macho"}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group inline>
                <label>Especie</label>
                <EspecieSelector
                  handleChange={this.handleChange}
                  valorSel={this.state.especie}
                />
              </Form.Group>

              <Form.Input
                name="raza"
                fluid
                label="Raza"
                placeholder="Raza"
                onChange={this.handleChange}
                value={raza}
              />

              <Form.Input
                name="fechaNacimiento"
                fluid
                label="Fecha de nacimiento"
                placeholder="Fecha de nacimiento"
                type="date"
                onChange={this.handleChange}
                value={fechaNacimiento}
              />

              <Form.Input
                name="correo"
                fluid
                label="Correo electrónico"
                placeholder="Correo electrónico"
                onChange={this.handleChange}
                value={correo}
                type="email"
              />
              <Form.Input
                name="telefono"
                fluid
                label="Teléfono"
                placeholder="Teléfono"
                onChange={this.handleChange}
                value={telefono}
              />

              {mensajeDatosIncompletos}
              <Button fluid color="green">
                Añadir Mascota
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}

export default NuevaMascota;
