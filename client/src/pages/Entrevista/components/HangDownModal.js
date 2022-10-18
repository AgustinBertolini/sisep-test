import React, {useContext, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import {Rating, Typography} from "@mui/material";
import {SocketContext} from "../../../SocketContext";

const HangDownModal = ({open, setOpen,guidOdoo}) => {
  const {leaveCall} = useContext(SocketContext);
  const [ratingValue, setRatingValue] = useState(0);

  const handleSubmit = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        SoeToken: "Cwf8tVGv674@",
      },
      body: JSON.stringify({
        status: "in progress",
        observations: "",
        result_attachment: "",
        score: "1",
      }),
    };
    //draft:es para informar algo
    //in progress:es para indicar que la esntrevista esta en curso
    //done:es para indicar que la entrevista termino
    //error:es para informar que hubo un error
    await fetch(
      `https://sisep.ovh001.eynes.com.ar/sisep/soe/interview/${guidOdoo}`,
      settings
    );
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
