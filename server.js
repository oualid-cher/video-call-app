const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const io = socketio(server);

app.use(express.static("public"));

app.set("view engine", "ejs");

// console.log(uuidv4());

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("home", { roomId: req.params.room });
  // console.log(req.params);
});

io.on("connection", (socket) => {
  socket.on("joinroom", (data) => {
    console.log(data);
    socket.join(data.room);

    socket.broadcast.to(data.room).emit("user-connected", "some data");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
