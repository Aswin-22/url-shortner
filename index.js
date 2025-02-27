const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectDb } = require("./connect");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/static");
const userRouter = require("./routes/user");

const { restrictTo, checkAuthentication } = require("./middleware/auth");

const app = express();
const port = 3000;

connectDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication);

app.use("/", staticRouter);
app.use("/url", restrictTo(["NORMAL"]), urlRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running at port : ${port}`);
});
