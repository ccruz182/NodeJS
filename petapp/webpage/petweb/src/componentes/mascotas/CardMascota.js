import React from "react";
import { Button, Card } from "semantic-ui-react";

const CardMascota = props => {
  const {nombre, correo, especie, genero} = props.info;
  let color = "blue";

  if (genero === "Hembra") {
    color = "pink";
  }

  return(
  <Card color={color}>
    <Card.Content>
      <Card.Header>{nombre}</Card.Header>
      <Card.Meta>
        <span>{correo}</span>
      </Card.Meta>
      <Card.Description>
        {especie}
      </Card.Description>
    </Card.Content>

    <Card.Content extra>
      <Button basic color="yellow">Más acciones</Button>
      <Button basic color="red">Eliminar</Button>
    </Card.Content>
  </Card>
  );
};

export default CardMascota;