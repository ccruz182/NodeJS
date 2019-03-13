import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import { baseURL } from "../../datos-servidor/datos";
import Error from "../detalleMascota/Error";
import ListaVacunas from "./ListaVacunas";
import ModalOk from "../formulario-mascota/ModalOk";

class Vacunas extends Component {
  state = {
    mascota: null,
    error: false,
    modalOkAbierto: false
  };

  componentDidMount() {
    this.obtenerMascota();
  }

  obtenerMascota = () => {
    axios
      .get(`${baseURL}/mascotas/${this.props.idMascota}`)
      .then(res => {
        if (res.data !== "") {
          this.setState({ mascota: res.data });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  };

  agregarVacuna = vacuna => {    
    const datenow = new Date();
    let mesD = datenow.getMonth() + 1;
    let diaD = datenow.getDate();

    if (mesD < 10) {
      mesD = "0" + mesD;
    }

    if (diaD < 10) {
      diaD = "0" + mesD;
    }
    const fechaAplicacion = `${datenow.getFullYear()}-${mesD}-${diaD}`;
    const nueva_vacuna = { ...vacuna, fechaAplicacion };

    axios
      .patch(
        `${baseURL}/mascotas/vacunas/${this.props.idMascota}`,
        nueva_vacuna
      )
      .then(res => {
        this.setState({ modalOkAbierto: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  cerrarModalOK = () => {
    this.setState({ modalOkAbierto: false });
    this.obtenerMascota();
  };

  render() {
    if (this.state.error) {
      return <Error />;
    }
    if (this.state.mascota) {
      return (
        <Container>
          <ModalOk
            estado={this.state.modalOkAbierto}
            titulo="Vacuna agregada exitosamente"
            cerrar={this.cerrarModalOK}
          />
          <ListaVacunas
            agregarVacuna={this.agregarVacuna}
            mascota={this.state.mascota}
          />
        </Container>
      );
    } else {
      return null;
    }
  }
}

export default Vacunas;
