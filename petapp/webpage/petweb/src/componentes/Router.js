import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Buscador from "./buscador/Buscador";
import DetalleMascota from "./detalleMascota/DetalleMascota";
import Vacunas from "./vacunas/Vacunas";
import Mascotas from "./mascotas/Mascotas";
import Navegacion from "./Navegacion";
import NuevaMascota from "./formulario-mascota/NuevaMascota";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navegacion />

          <div className="contenido">
            <Switch>
              <Route exact path="/mascotas" component={Mascotas} />

              <Route exact path="/nueva_mascota" component={NuevaMascota} />

              <Route exact path="/buscador_mascotas" component={Buscador} />

              <Route
                exact
                path="/mascota/:idMascota"
                render={props => {
                  const mascotaId = props.location.pathname.split("/")[2];
                  return <DetalleMascota idMascota={mascotaId} />;
                }}
              />

              <Route
                exact
                path="/mascotas/vacunas/:idMascota"
                render={props => {
                  const mascotaId = props.location.pathname.split("/")[3];
                  return <Vacunas idMascota={mascotaId} />;
                }}
              />

              {/*
              <Route exact path="/nosotros" component={Nosotros} />

              <Route exact path="/contacto" component={Contacto} />

              <Route
                exact
                path="/productos"
                render={() => <Productos prods={this.state.productos} />}
              />

              <Route
                exact
                path="/producto/:productoID"
                render={props => {
                  const prodId = props.location.pathname.split("/")[2];
                  return (
                    <DetalleProducto
                      informacion={this.state.productos[prodId]}
                    />
                  );
                }}
              />

              <Route component={Error} />
              */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
