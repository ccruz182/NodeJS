import React, { Component } from "react";
import { Button, Card, Message } from "semantic-ui-react";
import axios from "axios";
import getAge from "get-age";

import { baseURL } from "../../datos-servidor/datos";
import BotonAnimado from "./BotonAnimado";


class DetalleMascota extends Component {
  state = {
    mascota: null,
    error: false
  };
  componentDidMount() {
    axios
      .get(`${baseURL}/mascotas/${this.props.idMascota}`)
      .then(res => {
        this.setState({ mascota: res.data });
      })
      .catch(error => {
        this.setState({error: true});
      });
  }

  render() {
    if (this.state.error) {
      return (
        <Message negative>
          <Message.Header>Oopss... Ocurrió un error</Message.Header>
          <Message.Content>Favor de intentar otro perfil o contactar a servicio técnico.</Message.Content>
        </Message>
      );
    }
    if (this.state.mascota) {
      const {
        correo,
        especie,
        fechaNacimiento,
        genero,
        nombre,
        raza,
        telefono
      } = this.state.mascota;
      const edad = getAge(fechaNacimiento);
      let color = "blue";

      if (genero === "Hembra") {
        color = "pink";
      }

      return (
        <Card centered color={color} fluid>
          <Card.Content>
            <Card.Header>{nombre}</Card.Header>
            <Card.Description>
              <p>Especie: {especie}</p>
              <p>Raza: {raza}</p>
              <p>Edad: {edad} años</p>
              <p>Correo: {correo}</p>
              <p>Teléfono: {telefono}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group widths="3">
              <BotonAnimado contenido="Ver vacunas" icono="syringe" />
              <BotonAnimado contenido="Ver citas" icono="medkit" />
              <BotonAnimado contenido="Actualizar datos" icono="exchange" />
            </Button.Group>
          </Card.Content>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export default DetalleMascota;
