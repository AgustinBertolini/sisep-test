import React, {useContext, useEffect, useState} from "react";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCircleChevronRight} from "@fortawesome/free-solid-svg-icons";
import RowMessage from "./RowMessage";
import {DivChat} from "./styles/DivChat";
import {DivSendMessage} from "./styles/DivSendMessage";
import {InputMessage} from "./styles/InputMessage";
import {SendIcon} from "./styles/SendIcon";
import {firestore} from "../../../helpers/firebase";
import {Timestamp} from "@firebase/firestore";

library.add(faCircleChevronRight);

const Chat = ({
  isInterviewer,
  isCodeInterview,
  guidOdoo,
  interviewerName,
  interviewedName,
}) => {
  const [conversationState, setConversationState] = useState([]);
  const [messageState, setMessageState] = useState("");

  const handleSubmitMessage = async () => {
    if (messageState !== "") {
      await firestore.collection("conversations").add({
        guid: guidOdoo,
        message: messageState,
        date: Timestamp.fromDate(new Date()),
        timestamp: Timestamp.toString(),
        isEntrevistador: isInterviewer,
        name: isInterviewer ? interviewerName : interviewedName,
      });

      setMessageState("");
    }
  };

  const fetchData = async () => {
    await firestore.collection("conversations").onSnapshot(res =>
      setConversationState(
        res.docs
          .filter(doc => doc.data().guid === guidOdoo)
          .sort((a, b) => b.data().date.seconds - a.data().date.seconds)
          .map(doc => {
            const data = doc.data();

            return {
              guid: data.guid,
              date: new Date(data.date.seconds * 1000),
              timestamp: data.timestamp,
              isEntrevistador: data.isEntrevistador,
              message: data.message,
              name: data.name,
            };
          })
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{borderLeft: "1px solid #cbcbcb"}}>
        <DivChat
          style={{
            height: isCodeInterview ? "87vh" : "95vh",
            maxHeight: isCodeInterview ? "87vh" : "95vh",
          }}
        >
          {conversationState &&
            conversationState.length > 0 &&
            conversationState.map(conversation => {
              return (
                <RowMessage
                  key={conversation.timestamp}
                  message={conversation.message}
                  emisor={conversation.isEntrevistador}
                  messageName={conversation.name}
                  date={conversation.date}
                  name={isInterviewer ? interviewerName : interviewedName}
                />
              );
            })}
        </DivChat>
        <DivSendMessage>
          <InputMessage
            type="text"
            autoComplete="off"
            placeholder="Escriba un mensaje..."
            value={messageState}
            onChange={e => setMessageState(e.target.value)}
            onKeyUp={e => {
              e.key === "Enter" && handleSubmitMessage();
            }}
          ></InputMessage>
          <SendIcon
            onClick={() => handleSubmitMessage()}
            icon="fa-solid fa-circle-chevron-right"
            size="lg"
          ></SendIcon>
        </DivSendMessage>
      </div>
    </>
  );
};

export default Chat;
