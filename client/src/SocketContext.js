import React, {createContext, useState, useRef, useEffect} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("https://sisep-video-chat-app.herokuapp.com/");

const ContextProvider = ({children}) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [interviewedName, setInterviewedName] = useState("");
  const [textAreaCodeId, setTextAreaCodeState] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({video: true, audio: true})
      .then(currentStream => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      });

    socket.on("me", id => setMe(id));

    socket.on("calluser", ({from, name: callerName, signal}) => {
      setCall({isReceivingCall: true, from, name: callerName, signal});
    });
  }, []);

  const answercall = isCodeInterview => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit("answercall", {signal: data, to: call.from});
    });

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id, callingName) => {
    const peer = new Peer({initiator: true, trickle: false, stream});

    peer.on("signal", data => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: callingName,
      });
    });

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", signal => {
      setCallAccepted(true);
      setInterviewedName(name);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        callEnded,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        interviewedName,
        setInterviewedName,
        me,
        callUser,
        leaveCall,
        answercall,
        textAreaCodeId,
        setTextAreaCodeState,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export {ContextProvider, SocketContext};
