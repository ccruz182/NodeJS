import React, { Component } from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

import MenuLink from "./MenuLink";

class Navegacion extends Component {
  render() {
    return (
      <Menu size="large">
        <Menu.Item name="home">
          <Icon name="paw" />
          PetApp
        </Menu.Item>

        <Menu.Menu position="right">
          <Dropdown item text="Mascotas">
            <Dropdown.Menu>
              <MenuLink to="/mascotas" titulo="Ver Mascotas" />
              <MenuLink to="/nueva_mascota" titulo="Añadir Mascota" />
              <MenuLink to="/buscador_mascotas" titulo="Buscar Mascotas" />
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text="Citas">
            <Dropdown.Menu>
              <MenuLink to="/citas" titulo="Ver Citas" />
              <MenuLink to="/nueva_cita" titulo="Añadir Cita" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navegacion;
