import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import Chat from "./components/Chat";
import TextAreaCode from "./components/TextAreaCode";
import VideoPlayer from "./components/VideoPlayer";
import InitialDataModal from "./components/InitialDataModal";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPhoneSlash} from "@fortawesome/free-solid-svg-icons";
import {SocketContext} from "../../SocketContext";
library.add(faPhoneSlash);

const Entrevista = () => {
  const {name} = useContext(SocketContext);
  const params = new URLSearchParams(window.location.search);
  const guidOdoo = params.get("guid");
  const [showInitialModal, setShowInitialModal] = useState(true);
  const [isCodeInterview, setIsCodeInterview] = useState(false);
  const [isInterviewer, setIsInterviewer] = useState(false);
  const [interviewData, setInterviewData] = useState(null);

  const fetchData = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        SoeToken: "Cwf8tVGv674@",
      },
      body: JSON.stringify({}),
    };
    const response = await fetch(
      `https://sisep.ovh001.eynes.com.ar/sisep/soe/interview/getinfo/${guidOdoo}`,
      settings
    );
    const data = await response.json();
    setIsCodeInterview(data.result.is_code);
    setInterviewData(data.result);

    console.log("get odoo", data);
  };

  const finishInterview = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        SoeToken: "Cwf8tVGv674@",
      },
      body: JSON.stringify({
        status: "done",
        observations: "Prueba de endpoint 2",
        result_attachment: "",
        score: "4",
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
    const data = await response.json();
    console.log("post odoo", data);
  };

  useEffect(() => {
    fetchData();
    // finishInterview();
  }, []);

  return (
    <>
      <Row
        style={{
          display: showInitialModal && "none",
          marginRight: "0px",
          position: "sticky",
          top: "8%",
          backgroundColor: "white",
          zIndex: 99,
        }}
      >
        <Col sm={9}>
          <VideoPlayer
            isInterviewer={isInterviewer}
            isCodeInterview={isCodeInterview}
            showInitialModal={showInitialModal}
            guidOdoo={guidOdoo}
          />
        </Col>
        <Col sm={3} style={{position: "fixed", right: "-1%"}}>
          <Chat isInterviewer={isInterviewer} />
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
        interviewData={interviewData}
      />
    </>
  );
};

export default Entrevista;
