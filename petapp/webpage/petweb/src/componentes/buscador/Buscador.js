import React, { Component } from "react";
import { Button, Card, Input, Message } from "semantic-ui-react";
import axios from "axios";

import { baseURL } from "../../datos-servidor/datos";
import CardMascota from "../mascotas/CardMascota";
import ModalEliminacion from "../mascotas/ModalEliminacion";

class Buscador extends Component {
  correo = "";

  state = {
    mascotas: null,
    modalAbierto: false
  };

  cambioHandler = (event, data) => {
    this.correo = data.value;
  };

  busqueda = () => {
    this.obtencionMascotas();
  };

  eliminarMascota = id => {
    axios.delete(`${baseURL}/mascotas/${id}`).then(res => {
      this.setState({ modalAbierto: true });
    });
  };

  obtencionMascotas = () => {
    axios
      .get(`${baseURL}/mascota?correo=${this.correo}`)
      .then(res => {
        const mascotas = res.data;
        this.setState({ mascotas });
      })
      .catch(error => console.log(error));
  };

  cerrarModal = () => {
    this.setState({ modalAbierto: false });
    this.obtencionMascotas();
  };

  render() {
    const mascotasJSX = [];
    let the_error = null;
    const { modalAbierto } = this.state;

    if (this.state.mascotas) {
      const mascotas = [...this.state.mascotas];
      if (mascotas.length > 0) {
        mascotas.forEach(mascota => {
          mascotasJSX.push(
            <CardMascota
              key={mascota._id}
              info={mascota}
              eliminarHandler={this.eliminarMascota}
            />
          );
        });
      } else {
        the_error = (
          <div style={{marginBottom: "2%"}}>
          <Message centered negative>
            <Message.Header centered>
              No se encontraron concidencias con el correo electrónico ingresado
            </Message.Header>
            <p>Intenta con otro correo electrónico</p>
          </Message>
          </div>
        );
      }
    }

    return (
      <div>
        <ModalEliminacion
          modalAbierto={modalAbierto}
          cerrarModal={this.cerrarModal}
        />
        <Card centered fluid>
          <Card.Content>
            <Card.Header>
              <center>Busca un perfil con base en correo electrónico</center>
            </Card.Header>
            <Card.Description>
              <Input
                action={
                  <Button circular icon="search" onClick={this.busqueda} />
                }
                placeholder="Buscar por correo"
                fluid
                onChange={(e, d) => this.cambioHandler(e, d)}
                type="email"
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {the_error}
            <Card.Group itemsPerRow={3}>{mascotasJSX}</Card.Group>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Buscador;
