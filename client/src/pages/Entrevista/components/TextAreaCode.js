import React, {useEffect, useState} from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {Timestamp} from "@firebase/firestore";
import {firestore} from "../../../helpers/firebase";

const TextAreaCode = () => {
    const [docIdState, setDocIdState] = useState("");
    const [codeState, setCodeState] = useState("");

    const handleSetCode = async () => {
        if (docIdState.length > 0) {
            await firestore
                .collection("codes")
                .doc(docIdState)
                .set({
                    guid: "ASDGSFG1231",
                    code: codeState,
                    date: Timestamp.fromDate(new Date()),
                });
        } else {
            await firestore
                .collection("codes")
                .add({
                    guid: "ASDGSFG1231",
                    code: codeState,
                    date: Timestamp.fromDate(new Date()),
                })
                .then(doc => setDocIdState(doc.id));
        }
    };

    //TODO: Cuando se pueda reingresar a una entrevista esto va a traer el codigo
    const fetchData = async () => {
        await firestore.collection("codes").onSnapshot(res => {
            const savedCode = res.docs.find(
                doc => doc.data().guid === "ASDGSFG1231" && doc.data().code !== ""
            );
            if (savedCode) {
                setCodeState(savedCode.data().code);
            }
        });
    };

    useEffect(() => {
        handleSetCode();
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
                placeholder="Please enter JS code."
                onChange={evn => setCodeState(evn.target.value)}
                onKeyUp={e => e.key === "Enter" && setCodeState(`${codeState}`)}
                padding={15}
                style={{
                    fontSize: 12,
                    border: "1px solid lightgray",
                    backgroundColor: "#efefef",
                    marginBottom: "15%",
                    minHeight: "100%",
                    fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
            />
        </>
    );
};

export default TextAreaCode;
