import React from "react";
import { Button, List } from "semantic-ui-react";

const ItemVacuna = props => (
  <List.Item>
    <List.Content floated="right">
      <Button basic color="red">
        Eliminar
      </Button>
    </List.Content>
    <List.Content>
      <List.Header>{props.vacuna.tipoVacuna}</List.Header>
      Fecha de Aplicación: {props.vacuna.fechaAplicacion}
    </List.Content>
  </List.Item>
);

export default ItemVacuna;
