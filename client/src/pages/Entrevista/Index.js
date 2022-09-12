import React, {useContext, useState} from "react";
import {Button, Col, Row} from "reactstrap";
import Chat from "./components/Chat";
import TextAreaCode from "./components/TextAreaCode";
import VideoPlayer from "./components/VideoPlayer";
import InitialDataModal from "./components/InitialDataModal";
import {SocketContext} from "../../SocketContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPhoneSlash} from "@fortawesome/free-solid-svg-icons";
library.add(faPhoneSlash);

const Entrevista = () => {
    const {me, callAccepted, callEnded, leaveCall, call, answercall} = useContext(
        SocketContext
    );
    const [showInitialModal, setShowInitialModal] = useState(true);
    const [isCodeInterview, setIsCodeInterview] = useState(false);
    const [isInterviewer, setIsInterviewer] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(me);
    };

    return (
        <>
            <Row style={{display: showInitialModal && "none", marginRight: "0px"}}>
                <Col sm={9}>
                    <VideoPlayer
                        isInterviewer={isInterviewer}
                        isCodeInterview={isCodeInterview}
                    />
                </Col>
                <Col sm={3} style={{position: "fixed", right: "-1%"}}>
                    <Chat isInterviewer={isInterviewer} />
                </Col>
            </Row>
            <Row style={{marginRight: "0px", paddingLeft: "1%"}}>
                <Col sm={9} style={{textAlign: "center"}}>
                    {callAccepted && !callEnded && (
                        <Button color="danger" onClick={leaveCall}>
                            <FontAwesomeIcon
                                style={{transform: "rotate(90deg)"}}
                                icon="fa-solid fa-phone-slash"
                                size="sm"
                            />
                        </Button>
                    )}
                    {!callAccepted && isInterviewer && (
                        <Button
                            style={{display: showInitialModal}}
                            color="primary"
                            onClick={copyToClipboard}
                        >
                            Compartir código
                        </Button>
                    )}
                </Col>
            </Row>
            {isCodeInterview && (
                <Row
                    style={{
                        display: showInitialModal && "none",
                        marginTop: "5%",
                        marginRight: "0px",
                        marginBottom: "3%",
                    }}
                >
                    <Col sm={{offset: 1, size: 7}}>
                        <TextAreaCode />
                    </Col>
                </Row>
            )}

            <InitialDataModal
                open={showInitialModal}
                setOpen={setShowInitialModal}
                isCodeInterview={isCodeInterview}
                setIsCodeInterview={setIsCodeInterview}
                isInterviewer={isInterviewer}
                setIsInterviewer={setIsInterviewer}
            />
        </>
    );
};

export default Entrevista;
