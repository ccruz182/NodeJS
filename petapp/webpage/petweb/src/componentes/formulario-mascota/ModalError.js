import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const ModalError = props => (
  <Modal centered open={props.estado}>
    <Modal.Header color="red">Hubo un problema. Favor intenta nuevamente</Modal.Header>
    <Modal.Actions>
      <Button color="orange" onClick={props.cerrar} inverted>
        <Icon name="checkmark" /> OK !
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalError;
