import React, {useContext, useState} from "react";
import {
    Button,
    Col,
    FormGroup,
    Input,
    Label,
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
}) => {
    const {setName, callUser} = useContext(SocketContext);
    const [inputsValues, setInputsValues] = useState({
        name: "",
        guidInterview: "",
    });

    const handleSubmit = () => {
        if (isInterviewer) {
            setName(inputsValues.name);
            setOpen(!open);
        } else {
            setName(inputsValues.name);
            callUser(inputsValues.guidInterview, inputsValues.name);
            setOpen(!open);
        }
    };

    return (
        <Modal isOpen={open} style={{paddingTop: "10%"}}>
            <ModalBody>
                {isInterviewer ? (
                    <>
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={inputsValues.name}
                                        name="name"
                                        autoComplete="off"
                                        placeholder="Ingrese su nombre"
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
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        role="switch"
                                        autoComplete="off"
                                        checked={isCodeInterview}
                                        onChange={() =>
                                            setIsCodeInterview(!isCodeInterview)
                                        }
                                    />
                                    <Label check>Es entrevista con codigo</Label>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        role="switch"
                                        checked={isInterviewer}
                                        onChange={() =>
                                            setIsInterviewer(!isInterviewer)
                                        }
                                    />
                                    <Label check>Es entrevistador</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={inputsValues.name}
                                        autoComplete="off"
                                        placeholder="Ingrese su nombre"
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
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        value={inputsValues.guidInterview}
                                        autoComplete="off"
                                        name="guidInterview"
                                        placeholder="Código de la entrevista"
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
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        role="switch"
                                        checked={isCodeInterview}
                                        onChange={() =>
                                            setIsCodeInterview(!isCodeInterview)
                                        }
                                    />
                                    <Label check>Es entrevista con código</Label>
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup switch>
                                    <Input
                                        type="switch"
                                        role="switch"
                                        checked={isInterviewer}
                                        onChange={() =>
                                            setIsInterviewer(!isInterviewer)
                                        }
                                    />
                                    <Label check>Es entrevistador</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </> 
                )}
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => handleSubmit()}
                    disabled={
                        isInterviewer
                            ? inputsValues.name.length === 0
                            : inputsValues.guidInterview.length === 0 ||
                              inputsValues.name.length === 0
                    }
                >
                    Unirme ahora
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default InitialDataModal;
