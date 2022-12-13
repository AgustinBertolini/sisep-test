import {Typography} from "@mui/material";
import React from "react";
import {Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";

const MissingGuidModal = ({open}) => {
  return (
    <Modal isOpen={open} style={{paddingTop: "10%"}}>
      <ModalHeader>
        <Typography fontWeight={"bold"}>Error</Typography>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col sm={12}>
            <Typography fontSize={"1.2rem"}>
              La URL a la que quiere ingresar no contiene un GUID para reconocer la
              entrevista.
            </Typography>
            <Typography fontSize={"1.2rem"} mt={2}>
              Por favor revise la dirección ingresada.
            </Typography>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default MissingGuidModal;
