import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const ModalEliminacion = props => {
  return (
    <Modal
      basic
      open={props.modalAbierto}
      onClose={props.cerrarModal}
      size="small"
    >
      <Modal.Content>
        <h3>Se eliminó el perfil correctamente!</h3>
      </Modal.Content>

      <Modal.Actions>
        <Button color="green" onClick={props.cerrarModal} inverted>
          <Icon name="checkmark" /> OK!
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalEliminacion;
