import React, {createContext, useState, useRef, useEffect} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const ContextProvider = ({children}) => {
  const params = new URLSearchParams(window.location.search);
  const guid = params.get("guid");
  const socket = io(`https://sisep-video-chat-app.herokuapp.com`);
  // const socket = io(`http://localhost:5200`);
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState({});
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [interviewedName, setInterviewedName] = useState("");
  const [textAreaCodeId, setTextAreaCodeId] = useState("");
  const [socketUsers, setSocketUsers] = useState([]);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({video: true, audio: true})
      .then(currentStream => {
        setStream(currentStream);
      });

    socket.on("me", id => setMe(id));

    socket.on("users", users => setSocketUsers(users));

    socket.on("calluser", ({signal, from, name: callerName}) => {
      setCall({isReceivingCall: true, from, name: callerName, signal});
    });
  }, []);

  useEffect(() => {
    if (myVideo.current) myVideo.current.srcObject = stream;
  }, [stream]);

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

  const callUser = callingName => {
    const peer = new Peer({initiator: true, trickle: false, stream});

    peer.on("signal", data => {
      socket.emit("calluser", {
        userToCall: "",
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callended", () => {
      setCallEnded(true);
    });

    socket.on("callaccepted", signal => {
      setCallAccepted(true);
      setInterviewedName(name);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit("callended");

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
        setTextAreaCodeId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export {ContextProvider, SocketContext};
