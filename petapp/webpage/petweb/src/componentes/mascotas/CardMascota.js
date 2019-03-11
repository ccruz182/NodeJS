import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import {
  withRouter
} from 'react-router-dom'

class CardMascota extends Component {
  irMasDetalles = id => {
    this.props.history.push(`/mascota/${id}`);
  }
  render() {
    const { _id, nombre, correo, especie, genero } = this.props.info;
    let color = "blue";

    if (genero === "Hembra") {
      color = "pink";
    }
    
    return (
      <Card color={color}>
        <Card.Content>
          <Card.Header>{nombre}</Card.Header>
          <Card.Meta>
            <span>{correo}</span>
          </Card.Meta>
          <Card.Description>{especie}</Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Button basic color="yellow" onClick={() => this.irMasDetalles(_id)}>
            Más acciones
          </Button>
          <Button basic color="red" onClick={() => this.props.eliminarHandler(_id)}>
            Eliminar
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(CardMascota);
