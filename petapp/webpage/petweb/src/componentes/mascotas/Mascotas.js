import React, { Component } from "react";
import axios from "axios";

import CardMascota from "./CardMascota";
import { baseURL } from "../../datos-servidor/datos";
import { Card } from "semantic-ui-react";

class Mascotas extends Component {
  state = {
    mascotas: []
  };

  componentWillMount() {
    axios.get(`${baseURL}/mascotas`).then(res => {
      this.setState({ mascotas: res.data });
    });
  }

  render() {
    const mascotas = [...this.state.mascotas];
    const mascotasJSX = [];

    mascotas.forEach(mascota => {
      mascotasJSX.push(
        <CardMascota key={mascota._id} info={mascota} />
      );
    });

    return <Card.Group itemsPerRow={3}>{mascotasJSX}</Card.Group>;
  }
}

export default Mascotas;
