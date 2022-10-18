const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5200;
var usersArray = [];

app.get("/", (req, res) => {
  res.send(
    `Server is runnning. GUID: ${req.query.guid}. Users logged: ${JSON.stringify(usersArray)}`
  );
});

io.on("connection", (socket) => {
  usersArray.push(socket.id);
  socket.emit("me", socket.id);
  socket.emit("users", usersArray);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
    usersArray = [];
  });
  socket.on("calluser", ({userToCall, signalData, from, name}) => {
    // io.to(userToCall).emit("calluser", {signal: signalData, from, name});
    socket.broadcast.emit("calluser", {signal: signalData, from, name});
  });

  socket.on("answercall", (data) => {
    // io.to(data.to).emit("callaccepted", data.signal);
    socket.broadcast.emit("callaccepted", data.signal);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
