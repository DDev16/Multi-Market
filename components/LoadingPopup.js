import React, { useState } from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Loading,
} from "@nextui-org/react";

const LoadingPopup = ({visible, setVisible}) => {
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal
      preventClose
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
      css={{ minHeight: "150px" }}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Please Wait...
        </Text>
      </Modal.Header>

      <Loading size="xl" />
    </Modal>
  );
};

export default LoadingPopup;
