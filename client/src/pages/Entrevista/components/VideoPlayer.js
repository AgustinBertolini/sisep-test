import React, {useContext} from "react";
import {Button, Col, Row} from "reactstrap";
import {SocketContext} from "../../../SocketContext";

const VideoPlayer = ({isCodeInterview, isInterviewer}) => {
    const {
        name,
        callAccepted,
        myVideo,
        userVideo,
        callEnded,
        stream,
        call,
        answercall,
    } = useContext(SocketContext);

    return (
        <>
            {stream && (
                <>
                    <Row style={{paddingLeft: "3%", paddingTop: "5%"}}>
                        <Col
                            xs={6}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                                paddingLeft: "0px",
                                paddingRight: "2px",
                            }}
                        >
                            <video
                                width={"100%"}
                                height={"100%"}
                                playsInline
                                muted
                                ref={myVideo}
                                autoPlay
                                style={{borderRadius: "1%"}}
                            />
                            <span style={{fontWeight: "bold", color: "#4a4a4a"}}>
                                {name}
                            </span>
                        </Col>
                        {call.isReceivingCall && !callAccepted ? (
                            <Col sm={6}>
                                <div
                                    style={{
                                        display: "flex",
                                        marginTop: "40%",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        transition: "500ms",
                                    }}
                                >
                                    <h3 style={{color: "#4a4a4a", textAlign: "center"}}>
                                        {call.name} ha solicitado entrar a la llamada
                                    </h3>
                                    <Button
                                        style={{width: "25%"}}
                                        color="primary"
                                        onClick={() => answercall(isCodeInterview)}
                                    >
                                        Habilitar
                                    </Button>
                                </div>
                            </Col>
                        ) : (
                            !callAccepted && (
                                <Col sm={6}>
                                    <div
                                        style={{
                                            display: "flex",
                                            marginTop: "40%",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            transition: "500ms",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                color: "#4a4a4a",
                                                textAlign: "center",
                                            }}
                                        >
                                            {isInterviewer
                                                ? "Esperando al cantidado..."
                                                : "Esperando al entrevistador..."}
                                        </h3>
                                        <div className="loader"></div>
                                    </div>
                                </Col>
                            )
                        )}
                        {callAccepted && !callEnded && (
                            <>
                                <Col
                                    xs={6}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        textAlign: "center",
                                        paddingLeft: "2px",
                                        paddingRight: "0px",
                                    }}
                                >
                                    <video
                                        width={"100%"}
                                        height={"100%"}
                                        playsInline
                                        muted
                                        ref={userVideo}
                                        autoPlay
                                        style={{borderRadius: "1%"}}
                                    />
                                    <span
                                        style={{fontWeight: "bold", color: "#4a4a4a"}}
                                    >
                                        {isInterviewer ? "Candidato" : "Entrevistador"}
                                    </span>
                                </Col>
                            </>
                        )}
                    </Row>
                </>
            )}
        </>
    );
};

export default VideoPlayer;
