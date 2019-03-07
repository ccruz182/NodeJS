import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";


const MenuLink = props => {
  return (
    <Link to={props.to}>
      <Dropdown.Item>{props.titulo}</Dropdown.Item>
    </Link>
  );
};

export default MenuLink;
