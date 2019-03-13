import React from "react";
import { Divider, Header, Icon} from "semantic-ui-react";


const DividerDescripcion = props => (
  <Divider horizontal>
    <Header as="h4">
      <Icon name={props.icono}/>
      {props.titulo}
    </Header>
  </Divider>
);

export default DividerDescripcion;
