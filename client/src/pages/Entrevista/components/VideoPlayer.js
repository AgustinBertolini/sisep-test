import React, {useContext, useState} from "react";
import {Button, Col, Row} from "reactstrap";
import {SocketContext} from "../../../SocketContext";
import HangDownModal from "./HangDownModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const VideoPlayer = ({
  isCodeInterview,
  isInterviewer,
  showInitialModal,
  guidOdoo,
  interviewerName,
  interviewedName,
}) => {
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
        status: "in_progress",
        observations: "Comenzo la entrevista",
        result_attachment: "",
        score: "0",
      }),
    };
    //in_progress:es para indicar que la esntrevista esta en curso
    //done:es para indicar que la entrevista termino
    //error:es para informar que hubo un error
    const response = await fetch(
      `https://sisep.ovh001.eynes.com.ar/sisep/soe/interview/${guidOdoo}`,
      settings
    );
  };

  return (
    <>
      {stream && (
        <>
          <Row
            style={{
              paddingLeft: "3%",
              paddingTop: isCodeInterview ? "0%" : "5%",
              height: isCodeInterview ? "220px" : "",
              zIndex: isCodeInterview ? 9999 : 999,
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
                maxHeight: "150px",
                marginBottom: isCodeInterview ? "" : "6%",
              }}
            >
              <video
                width={"100%"}
                height={isCodeInterview ? "100%" : "378px"}
                playsInline
                ref={myVideo}
                autoPlay
                style={{borderRadius: "1%"}}
              />
              <span style={{fontWeight: "bold", color: "#4a4a4a"}}>
                {isInterviewer ? interviewerName : interviewedName}
              </span>
            </Col>
            {call.isReceivingCall && !callAccepted && isInterviewer ? (
              <Col sm={6}>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10%",
                    alignItems: "center",
                    flexDirection: "column",
                    transition: "500ms",
                  }}
                >
                  <h3 style={{color: "#4a4a4a", textAlign: "center"}}>
                    {interviewedName} ha solicitado entrar a la llamada
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
                      marginTop: "10%",
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
                    maxHeight: "150px",
                  }}
                >
                  <video
                    width={"100%"}
                    height={isCodeInterview ? "100%" : "378px"}
                    playsInline
                    ref={userVideo}
                    autoPlay
                    style={{
                      borderRadius: "1%",
                    }}
                  />
                  <span style={{fontWeight: "bold", color: "#4a4a4a"}}>
                    {isInterviewer ? interviewedName : interviewerName}
                  </span>
                  <Button
                    color="danger"
                    onClick={() => {
                      isInterviewer
                        ? setShowHangDownModal(!showHangDownModal)
                        : window.location.reload();
                    }}
                    style={{width: "10%"}}
                  >
                    <FontAwesomeIcon
                      style={{transform: "rotate(90deg)"}}
                      icon="fa-solid fa-phone-slash"
                      size="sm"
                    />
                  </Button>
                </Col>
              </>
            )}
            {callEnded && (
              <Col
                md={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <h4>La llamada ha terminado.</h4>
              </Col>
            )}
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
