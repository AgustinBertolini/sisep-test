import React, {useContext, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import {Rating, Typography} from "@mui/material";
import {SocketContext} from "../../../SocketContext";

const HangDownModal = ({open, setOpen}) => {
  const {leaveCall} = useContext(SocketContext);
  const [ratingValue, setRatingValue] = useState(0);

  const handleSubmit = () => {
    leaveCall();
  };

  return (
    <Modal isOpen={open} style={{paddingTop: "10%", width: "20%"}}>
      <ModalBody>
        <Row>
          <Typography component="legend" fontSize="0.8rem" fontWeight="bold">
            Puntue la entrevista
          </Typography>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            defaultValue={1}
            size="large"
            sx={{".MuiSvgIcon-root": {fill: "yellow"}}}
          />
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleSubmit()}>
          Finalizar entrevista
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default HangDownModal;
