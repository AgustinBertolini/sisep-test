import React, {useContext} from "react";
import "./styles/RowMessage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faClock, faCheckDouble} from "@fortawesome/free-solid-svg-icons";
import {SocketContext} from "../../../SocketContext";
library.add(faClock, faCheckDouble);

const RowMessage = props => {
    const {name} = useContext(SocketContext);
    const {message, messageName, date} = props;
    return (
        <>
            <div
                className="divChatMessage"
                style={{justifyContent: messageName === name ? "right" : "left"}}
            >
                <div className="divText">
                    <div>
                        <span className="spanName">{messageName}</span>
                    </div>
                    <span>{message}</span>
                    <div className="divMessageTime">
                        <span>{`${date
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:${date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}`}</span>
                        <FontAwesomeIcon
                            className="iconTime"
                            icon="fa-solid fa-clock"
                            size="sm"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RowMessage;
