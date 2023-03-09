import { Server } from "socket.io";
// var cors = require("cors");
import cors from "cors";
//app.use(cors()); // Use this after the variable declaration

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});
let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};
console.log(io);
console.log("hlo");
io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });
  // [
  //   {
  //     username: "john",
  //     socketId: "sakdakhkhadk ",
  //   },
  //   {
  //     username: "jane",
  //     socketId: "sakdakhkhadk ",
  //   },
  // ];
  console.log("Someone has connected!");
  //io.emit("firstEvent", "Hello this is test!");
  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    console.log("type", type);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });
  //for comment
  // socket.on("sendText", ({ senderName, receiverName, text }) => {
  //   const receiver = getUser(receiverName);
  //   console.log("type", type);
  //   io.to(receiver.socketId).emit("getNotification", {
  //     senderName,
  //     text,
  //   });
  // });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("Someone has left");
  });
});
io.listen(5000);
