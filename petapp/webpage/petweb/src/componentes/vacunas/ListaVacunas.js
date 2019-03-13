import React from "react";
import { Container, Divider, Header, List, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import BotonAnimado from "../detalleMascota/BotonAnimado";
import DividerDescripcion from "./DividerDescripcion";
import ItemVacuna from "./ItemVacuna";
import NuevaVacuna from "./NuevaVacuna";

const ListaVacunas = props => {
  const { _id, especie, nombre, raza, vacunas } = props.mascota;
  const vacunasJSX = [];
  
  if (vacunas.length > 0) {
    vacunas.forEach(vacuna => {
      vacunasJSX.push(<ItemVacuna key={vacuna._id} vacuna={vacuna} />);
    });
  } else {
    vacunasJSX.push(
      <Message
        key={0}
        warning
        header="Aún no hay vacunas"
        content="Agrega vacunas en la parte inferior"
      />
    );
  }

  const regresarPerfil = () => {
    props.history.push(`/mascota/${_id}`);
  };

  return (
    <Container>
      <Header as="h2" content={nombre} />
      <p>Especie: {especie}</p>
      <p> Raza: {raza}</p>

      <DividerDescripcion icono="syringe" titulo="Vacunas administradas" />

      <List divided verticalAlign="middle">
        {vacunasJSX}
      </List>

      <DividerDescripcion icono="tasks" titulo="Acciones" />
      <NuevaVacuna agregarVacuna={props.agregarVacuna} />
      <Divider />
      <BotonAnimado
        fluid
        icono="undo"
        contenido="Regresar a perfil"
        onClick={regresarPerfil}
      />
    </Container>
  );
};

export default withRouter(ListaVacunas);
