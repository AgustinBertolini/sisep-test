import {Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
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
  const {setName, callUser} = useContext(SocketContext);
  const [inputsValues, setInputsValues] = useState({
    name: "",
    guidInterview: "",
  });
  const [validationWarning, setValidationWarning] = useState(false);

  const handleSubmit = () => {
    if (inputsValues.name === interviewData.mail_interviewer) {
      setName(inputsValues.name);
      setOpen(!open);
      setIsInterviewer(true);
    }
    if (inputsValues.name === interviewData.mail_interviewed) {
      setName(inputsValues.name);
      callUser(inputsValues.name);
      setOpen(!open);
    }
    if (
      inputsValues.name !== interviewData.mail_interviewer &&
      inputsValues.name !== interviewData.mail_interviewed
    ) {
      setValidationWarning(true);
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
              invalid={validationWarning}
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
            <FormFeedback style={{marginTop: "10px"}}>Email incorrecto</FormFeedback>
            {!validationWarning && (
              <Typography
                fontSize={"0.8rem"}
                htmlColor={"#fafafa"}
                sx={{opacity: "75%", marginTop: "10px"}}
              >
                Este campo es utilizado para validar su identidad
              </Typography>
            )}
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
