import {Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {Button, Col, Input, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import {SocketContext} from "../../../SocketContext";

const InitialDataModal = ({
  open,
  setOpen,
  isCodeInterview,
  setIsCodeInterview,
  isInterviewer,
  setIsInterviewer,
  interviewData,
}) => {
  const params = new URLSearchParams(window.location.search);
  const guid = params.get("guid");
  const {setName, callUser} = useContext(SocketContext);
  const [inputsValues, setInputsValues] = useState({
    name: "",
    guidInterview: "",
  });

  const handleSubmit = () => {
    if (inputsValues.name === interviewData.mail_interviewer) {
      setName(inputsValues.name);
      setOpen(!open);
      setIsInterviewer(true);
    } else {
      setName(inputsValues.name);
      callUser(inputsValues.name);
      setOpen(!open);
    }
  };

  return (
    <Modal isOpen={open} style={{paddingTop: "10%"}}>
      <ModalBody>
        <Row>
          <Col sm={12}>
            <Input
              type="text"
              value={inputsValues.name}
              autoComplete="off"
              placeholder="Ingrese su email"
              name="name"
              onChange={e => {
                setInputsValues({
                  ...inputsValues,
                  [e.target.name]: e.target.value,
                });
              }}
              onKeyUp={e => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <Typography fontSize={"0.8rem"} htmlColor={"#fafafa"} sx={{opacity: "75%"}}>
              Este campo es utilizado para validar su identidad
            </Typography>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => handleSubmit()}
          disabled={inputsValues.name.length === 0}
        >
          Unirme ahora
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InitialDataModal;
