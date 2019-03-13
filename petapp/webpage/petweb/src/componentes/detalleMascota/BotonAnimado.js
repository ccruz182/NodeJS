import React from "react";
import { Button, Icon } from "semantic-ui-react";

const BotonAnimado = props => (
  <Button
    fluid={props.fluid}
    basic
    color="green"
    animated
    onClick={props.onClick}  
  >
    <Button.Content visible>{props.contenido}</Button.Content>
    <Button.Content hidden>
      <Icon name={props.icono} />
    </Button.Content>
  </Button>
);

export default BotonAnimado;
