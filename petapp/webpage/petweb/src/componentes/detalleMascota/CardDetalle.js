import React from "react";
import { Button, Card } from "semantic-ui-react";
import getAge from "get-age";

import BotonAnimado from "./BotonAnimado";

const CardDetalle = props => {
  const {
    correo,
    especie,
    fechaNacimiento,
    genero,
    nombre,
    raza,
    telefono
  } = props.mascota;

  const edad = getAge(fechaNacimiento);
  let color = "blue";

  if (genero === "Hembra") {
    color = "pink";
  }

  return (
    <Card centered color={color} fluid>
      <Card.Content>
        <Card.Header>{nombre}</Card.Header>
        <Card.Description>
          <p>Especie: {especie}</p>
          <p>Raza: {raza}</p>
          <p>Edad: {edad} años</p>
          <p>Correo: {correo}</p>
          <p>Teléfono: {telefono}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="3">
          <BotonAnimado
            contenido="Ver vacunas"
            icono="syringe" 
            onClick={props.vacunasHandler}           
          />
          <BotonAnimado contenido="Ver citas" icono="medkit" />
          <BotonAnimado contenido="Actualizar datos" icono="exchange" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default CardDetalle;
