import React, { Component } from "react";
import { Button, Card, Form } from "semantic-ui-react";
import axios from "axios";

import EspecieSelector from "./formulario-mascota/EspecieSelector";
import ModalOk from "./formulario-mascota/ModalOk";

import { baseURL } from "../datos-servidor/datos";

class NuevaMascota extends Component {
  state = {
    nombre: "",
    genero: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    correo: "",
    telefono: "",
    mostrarModal: false
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
        console.log("ERROR", error);
      });
  };

  render() {
    const {
      nombre,
      genero,
      raza,
      fechaNacimiento,
      correo,
      telefono
    } = this.state;

    const { mostrarModal } = this.state;

    return (
      <div>
        <ModalOk estado={mostrarModal} cerrar={this.cerrarModal} />
        <Card fluid>
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
                <EspecieSelector handleChange={this.handleChange} valorSel={this.state.especie}/>
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
              />
              <Form.Input
                name="telefono"
                fluid
                label="Teléfono"
                placeholder="Teléfono"
                onChange={this.handleChange}
                value={telefono}
              />

              <Button fluid color="green">
                Añadir
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}

export default NuevaMascota;
