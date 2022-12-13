import React, {useContext, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {Rating, TextareaAutosize, Typography} from "@mui/material";
import {SocketContext} from "../../../SocketContext";

const HangDownModal = ({open, setOpen, guidOdoo}) => {
  const {leaveCall} = useContext(SocketContext);
  const [ratingValue, setRatingValue] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        SoeToken: "Cwf8tVGv674@",
      },
      body: JSON.stringify({
        status: "done",
        observations: observaciones,
        result_attachment: "",
        score: ratingValue >= 0 && ratingValue <= 5 ? ratingValue.toString() : "0",
      }),
    };
    //in_progress:es para indicar que la esntrevista esta en curso
    //done:es para indicar que la entrevista termino
    //error:es para informar que hubo un error
    await fetch(
      `https://sisep.ovh001.eynes.com.ar/sisep/soe/interview/${guidOdoo}`,
      settings
    );
    leaveCall();
  };

  return (
    <Modal isOpen={open} style={{paddingTop: "10%", zIndex: 99999}}>
      <ModalHeader>
        <Typography fontSize="0.8rem" fontWeight="bold">
          Puntue la entrevista
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            size="large"
            sx={{".MuiSvgIcon-root": {fill: "yellow"}}}
          />
          <Typography fontSize="0.7rem">
            Indique el desempeño del candidato en una escala del 1 al 5 donde 1 es muy
            mala y 5 muy buena.
          </Typography>
        </Row>
        <Row style={{marginTop: "1%"}}>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Observaciones"
            onChange={event => setObservaciones(event.target.value)}
            style={{width: "100%", height: "200px", borderColor: "lightgray"}}
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
