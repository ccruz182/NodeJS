import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import axios from "axios";

import CardMascota from "./CardMascota";
import ModalEliminacion from "./ModalEliminacion";
import { baseURL } from "../../datos-servidor/datos";

class Mascotas extends Component {
  state = {
    mascotas: [],
    modalAbierto: false
  };

  componentWillMount() {
    this.obtencionMascotas();
  }

  obtencionMascotas = () => {
    axios.get(`${baseURL}/mascotas`).then(res => {
      this.setState({ mascotas: res.data });
    });
  };

  eliminarMascota = id => {
    axios.delete(`${baseURL}/mascotas/${id}`).then(res => {
      this.setState({modalAbierto: true});
    });
  };

  cerrarModal = () => {
    this.setState({modalAbierto: false});
    this.obtencionMascotas();
  };

  render() {
    const mascotas = [...this.state.mascotas];
    const mascotasJSX = [];

    const modalAbierto = this.state.modalAbierto;

    mascotas.forEach(mascota => {
      mascotasJSX.push(
        <CardMascota
          key={mascota._id}
          info={mascota}
          eliminarHandler={this.eliminarMascota}
        />
      );
    });

    return (
      <div>
        <ModalEliminacion
          modalAbierto={modalAbierto}
          cerrarModal={this.cerrarModal}
        />
        <Card.Group itemsPerRow={3}>{mascotasJSX}</Card.Group>
      </div>
    );
  }
}

export default Mascotas;
