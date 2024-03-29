const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const verificationRouter = require("./routes/verification");

app.use(express.json());
app.use(cors());

const port = 8080;

socketIO.on("connection", (socket) => {

  socket.on("join chat", (chat_id) => socket.join(chat_id))

  socket.on("message", (data) => {
    socketIO.to(data.chat_id).emit("messageResponse", data);
  });

  socket.on("editMessage", (chat_id) => {
    socketIO.to(chat_id).emit("editMessageResponse", chat_id);
  });

  socket.on("typing", ({ chat_id, state }) => {
    socket.broadcast.to(chat_id).emit("typingResponse", state);
  });

});

app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);
app.use(messageRouter);
app.use(verificationRouter);

http.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
