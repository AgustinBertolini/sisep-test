import React, {useContext, useEffect, useState} from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {Timestamp} from "@firebase/firestore";
import {firestore} from "../../../helpers/firebase";
import {SocketContext} from "../../../SocketContext";

const TextAreaCode = ({guidOdoo}) => {
  const {textAreaCodeId, setTextAreaCodeId} = useContext(SocketContext);
  const [codeState, setCodeState] = useState("Ingrese su codigo aqui.");

  const handleSetCode = async () => {
    if (codeState !== "Ingrese su codigo aqui.") {
      if (textAreaCodeId.length > 0) {
        await firestore
          .collection("codes")
          .doc(textAreaCodeId)
          .set({
            guid: guidOdoo,
            code: codeState,
            date: Timestamp.fromDate(new Date()),
          });
      } else {
        await firestore
          .collection("codes")
          .add({
            guid: guidOdoo,
            code: codeState,
            date: Timestamp.fromDate(new Date()),
          })
          .then(doc => setTextAreaCodeId(doc.id));
      }
    }
  };

  //TODO: Cuando se pueda reingresar a una entrevista esto va a traer el codigo
  const fetchData = async () => {
    await firestore.collection("codes").onSnapshot(res => {
      const savedCode = res.docs.find(doc => doc.data().guid === guidOdoo && doc.data().code !== '');

      if (savedCode) {
        setTextAreaCodeId(savedCode.id);
        setCodeState(savedCode.data().code);
      }
    });
  };

  useEffect(() => {
    // handleSetCode();
    fetchData();
  }, []);

  useEffect(() => {
    handleSetCode();
  }, [codeState]);

  return (
    <>
      <CodeEditor
        value={codeState}
        language="js"
        onBlur={evn => setCodeState(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          border: "1px solid lightgray",
          backgroundColor: "#efefef",
          marginBottom: "25%",
          minHeight: "100%",
          zIndex: 999,
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </>
  );
};

export default TextAreaCode;
