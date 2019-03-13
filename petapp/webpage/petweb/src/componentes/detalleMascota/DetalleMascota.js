import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { baseURL } from "../../datos-servidor/datos";
import CardDetalle from "./CardDetalle";
import Error from "./Error";

class DetalleMascota extends Component {
  state = {
    mascota: null,
    error: false    
  };

  componentDidMount() {
    axios
      .get(`${baseURL}/mascotas/${this.props.idMascota}`)
      .then(res => {
        if (res.data !== "") {
          this.setState({ mascota: res.data });
        } else {
          this.setState({error: true});
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  irVacunas = () => {
    this.props.history.push(`/mascotas/vacunas/${this.state.mascota._id}`);
    console.log(this.state.mascota._id);
  }

  render() {
    if (this.state.error) {
      return <Error />
    }
    if (this.state.mascota) {
      return <CardDetalle mascota={this.state.mascota} vacunasHandler={this.irVacunas}/>
    } else {
      return null;
    }
  }
}

export default withRouter(DetalleMascota);
