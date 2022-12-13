import React, {useContext, useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import Chat from "./components/Chat";
import TextAreaCode from "./components/TextAreaCode";
import VideoPlayer from "./components/VideoPlayer";
import InitialDataModal from "./components/InitialDataModal";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPhoneSlash} from "@fortawesome/free-solid-svg-icons";
import MissingGuidModal from "./components/MissingGuidModal";
library.add(faPhoneSlash);

const Entrevista = () => {
  const params = new URLSearchParams(window.location.search);
  const guidOdoo = params.get("guid");
  const [showInitialModal, setShowInitialModal] = useState(true);
  const [showMissingGuidModal, setShowMissingGuidModal] = useState(false);
  const [isCodeInterview, setIsCodeInterview] = useState(false);
  const [isInterviewer, setIsInterviewer] = useState(false);
  const [interviewData, setInterviewData] = useState(null);
  const [interviewerName, setInterviewerName] = useState("");
  const [interviewedName, setInterviewedName] = useState("");

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
    debugger;
    if (data.result.status === "nodata") {
      return setShowMissingGuidModal(!showMissingGuidModal);
    }
    setIsCodeInterview(data.result.is_code);
    setInterviewData(data.result);
    setInterviewerName(
      data.result.application_data[0]
        ? data.result.application_data[0].create_uid[1]
        : ""
    );
    setInterviewedName(
      data.result.application_data[0]
        ? data.result.application_data[0].partner_name
        : ""
    );

    console.log("get odoo", data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row
        style={{
          display: showInitialModal && "none",
          marginRight: "0px",
          position: "sticky",
          top: "40px",
          backgroundColor: "white",
          zIndex: 999,
        }}
      >
        <Col sm={9}>
          <VideoPlayer
            isInterviewer={isInterviewer}
            isCodeInterview={isCodeInterview}
            showInitialModal={showInitialModal}
            guidOdoo={guidOdoo}
            interviewerName={interviewerName}
            interviewedName={interviewedName}
          />
        </Col>
        <Col sm={3} style={{position: "fixed", right: "-10px"}}>
          <Chat
            isInterviewer={isInterviewer}
            isCodeInterview={isCodeInterview}
            guidOdoo={guidOdoo}
            interviewerName={interviewerName}
            interviewedName={interviewedName}
          />
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
            <TextAreaCode guidOdoo={guidOdoo} isInterviewer={isInterviewer} />
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
      <MissingGuidModal open={showMissingGuidModal} />
    </>
  );
};

export default Entrevista;
