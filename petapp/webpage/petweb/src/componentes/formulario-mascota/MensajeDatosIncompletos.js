import React from "react";
import { Message } from "semantic-ui-react";

const MensajeDatosIncompletos = props => (
  <Message negative>
    <Message.Header>
      Oops... Hay un problema con los datos ingresados
    </Message.Header>
    <p>{props.mensaje}</p>
  </Message>
);

export default MensajeDatosIncompletos;
