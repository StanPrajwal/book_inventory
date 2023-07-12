const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const bodyParser = require("body-parser")
const userRouter = require("./route/user")
const bookRouter = require("./route/book")
const app = express()
const PORT = process.env.PORT || 5000


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user",userRouter)
app.use("/book",bookRouter)
mongoose
.connect(process.env.mongoURI)
.then((res) => {
  console.log("Database connected");
  app.listen(PORT, () =>
    console.log(`server Started http://localhost:${PORT}`)
  );
})
.catch((e) => console.log(e));