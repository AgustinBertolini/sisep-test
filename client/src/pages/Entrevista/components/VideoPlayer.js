import React, {useContext, useState} from "react";
import {Button, Col, Row} from "reactstrap";
import {SocketContext} from "../../../SocketContext";
import HangDownModal from "./HangDownModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const VideoPlayer = ({isCodeInterview, isInterviewer, showInitialModal, guidOdoo}) => {
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
  const [showHangDownModal, setShowHangDownModal] = useState(false);

  const answerCall = async () => {
    answercall(isCodeInterview);
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
    const response = await fetch(
      `https://sisep.ovh001.eynes.com.ar/sisep/soe/interview/${guidOdoo}`,
      settings
    );

    console.log("response", response.json());
  };

  return (
    <>
      {stream && (
        <>
          <Row
            style={{
              paddingLeft: "3%",
              paddingTop: isCodeInterview ? "0%" : "5%",
            }}
          >
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
                height={isCodeInterview ? "40%" : "100%"}
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{borderRadius: "1%", transition: "1000ms"}}
              />
              <span style={{fontWeight: "bold", color: "#4a4a4a"}}>{name}</span>
            </Col>
            {call.isReceivingCall && !callAccepted && isInterviewer ? (
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
                    onClick={() => answerCall()}
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
                    height={isCodeInterview ? "40%" : "100%"}
                    playsInline
                    muted
                    ref={userVideo}
                    autoPlay
                    style={{borderRadius: "1%", transition: "1000ms"}}
                  />
                  <span style={{fontWeight: "bold", color: "#4a4a4a"}}>
                    {isInterviewer ? "Candidato" : "Entrevistador"}
                  </span>
                </Col>
              </>
            )}
            <Row
              style={{marginRight: "0px", paddingLeft: "1%", justifyContent: "center"}}
            >
              {callAccepted && !callEnded && isInterviewer && (
                <Button
                  color="danger"
                  onClick={() => setShowHangDownModal(!showHangDownModal)}
                  style={{width: "5%"}}
                >
                  <FontAwesomeIcon
                    style={{transform: "rotate(90deg)"}}
                    icon="fa-solid fa-phone-slash"
                    size="sm"
                  />
                </Button>
              )}
            </Row>
          </Row>
          <HangDownModal
            open={showHangDownModal}
            setOpen={setShowHangDownModal}
            guidOdoo={guidOdoo}
          />
        </>
      )}
    </>
  );
};

export default VideoPlayer;
