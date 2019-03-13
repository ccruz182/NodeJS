import React from "react";
import { Message } from "semantic-ui-react";

const Error = () => (
  <Message negative>
    <Message.Header>Oopss... Ocurrió un error</Message.Header>
    <Message.Content>
      Favor de intentar otro perfil o contactar a servicio técnico.
    </Message.Content>
  </Message>
);

export default Error;
