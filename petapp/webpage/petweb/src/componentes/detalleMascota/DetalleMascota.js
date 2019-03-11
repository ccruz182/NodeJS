import React, { Component } from "react";
import axios from "axios";

import { baseURL } from "../../datos-servidor/datos";
import { Card } from "semantic-ui-react";

class DetalleMascota extends Component {
  state = {
    mascota: null
  };
  componentDidMount() {
    axios
      .get(`${baseURL}/mascotas/${this.props.idMascota}`)
      .then(res => {
        this.setState({ mascota: res.data });
      })
      .catch();
  }

  render() {
    if (this.state.mascota) {
    const { nombre } = this.state.mascota;
    return (
      <Card>
        <Card.Header>{nombre}</Card.Header>
      </Card>
    );
    } else {
      return null;
    }
  }
}

export default DetalleMascota;
