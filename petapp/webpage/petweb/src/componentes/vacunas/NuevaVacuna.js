import React, { Component } from "react";
import { Form, Header, Message } from "semantic-ui-react";

import BotonAnimado from "../detalleMascota/BotonAnimado";

class NuevaVacuna extends Component {
  state = {
    tipoVacuna: "",
    error: false
  };

  /**
   * Handler para la entrada de texto, referente al tipo de vacuna.
   */
  tipoVacunaOnChangeHandler = (event, data) => {
    this.setState({ tipoVacuna: data.value });
  };

  /**
   * Se agrega la vacuna. Hace llamado a función pasada mediante props.
   * Si el campo está vacío, de manera interna, muestra el error.
   */
  agregaVacuna = () => {
    const tipoVacuna = this.state.tipoVacuna;

    if (tipoVacuna === "") {
      this.setState({ error: true });
      return;
    }

    this.props.agregarVacuna({ tipoVacuna });
    this.setState({ tipoVacuna: "", error: false });
  };

  render() {
    let errorJSX = (
      <Message
        negative
        header="El campo no puede estar vacio"
        content="Favor de ingresar el tipo de vacuna"
      />
    );

    if (!this.state.error) {
      errorJSX = null;
    }

    return (
      <Form onSubmit={this.agregaVacuna}>
        <Header as="h3" content="Adición de vacuna" />
        <Form.Input
          fluid
          label="Tipo de Vacuna"
          placeholder="Tipo de Vacuna"
          onChange={this.tipoVacunaOnChangeHandler}
          value={this.state.tipoVacuna}
        />
        {errorJSX}
        <BotonAnimado fluid contenido="Agregar vacuna" icono="add" />
      </Form>
    );
  }
}

export default NuevaVacuna;
