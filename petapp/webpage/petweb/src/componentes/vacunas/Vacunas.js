import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

import { baseURL } from "../../datos-servidor/datos";
import Error from "../detalleMascota/Error";
import ListaVacunas from "./ListaVacunas";
import ModalOk from "../utils/ModalOk";

class Vacunas extends Component {
  state = {
    mascota: null,
    error: false,
    modalOkAbierto: false,
    textoModalOk: ""
  };

  /**
   * Se obtiene la mascota en el momento del mount
   */
  componentDidMount() {
    this.obtenerMascota();
  }

  /**
   * Función para la obtención de la mascota. Petición GET a la API
   */
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
        this.setState({ error: true });
      });
  };

  /**
   * Se agrega una vacuna desde el componente NuevaVacuna.
   * Petición PATCH a la API
   */
  agregarVacuna = vacuna => {
    // Se realiza el cálculo de la fecha actual y se da formato
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

    // Petición a la API
    axios
      .patch(
        `${baseURL}/mascotas/vacunas/${this.props.idMascota}`,
        nueva_vacuna
      )
      .then(res => {
        this.setState({
          modalOkAbierto: true,
          textoModalOk: "Se agregó la vacuna correctamente"
        });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  /**
   * Se elimina una vacuna desde el componente ItemVacuna.
   * Petición PATCH a la API
   */
  eliminarVacuna = idVacuna => {
    axios
      .patch(`${baseURL}/mascotas/vacunas/${this.props.idMascota}/${idVacuna}`)
      .then(res => {
        this.setState({
          modalOkAbierto: true,
          textoModalOk: "Se eliminó la vacuna correctamente"
        });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  /**
   * Manipulación del estado para cerrar el modal.
   * Después, se vuelven a obtener las mascotas para que el cambio sea visible.
   */
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
            titulo={this.state.textoModalOk}
            cerrar={this.cerrarModalOK}
          />
          <ListaVacunas
            agregarVacuna={this.agregarVacuna}
            eliminarVacuna={this.eliminarVacuna}
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
