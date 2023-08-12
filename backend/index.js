const express = require("express");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 8080

app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);
app.use(messageRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})