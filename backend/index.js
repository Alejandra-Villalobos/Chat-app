const express = require("express");

const userRouter = require("./routes/user");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 8080

app.use(userRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})