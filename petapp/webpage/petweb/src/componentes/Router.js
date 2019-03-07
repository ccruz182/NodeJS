import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navegacion from "./Navegacion";
import NuevaMascota from "./NuevaMascota";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navegacion />

          <div className="contenido">
            <Switch>
              <Route
                exact
                path="/nueva_mascota"
                component={NuevaMascota}
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
