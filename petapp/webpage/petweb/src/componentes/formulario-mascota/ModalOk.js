import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const ModalOk = props => (
  <Modal centered open={props.estado}>
    <Modal.Header>Se agregó la mascota correctamente!</Modal.Header>
    <Modal.Actions>
      <Button color="green" onClick={props.cerrar} inverted>
        <Icon name="checkmark" /> OK !
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalOk;
