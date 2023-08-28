const express = require("express");
const app = express();
const router = require("./src/routers/router")(app);

const memberRouter = require("./src/routers/member/member_router");
const session = require("express-session");
const sessionConfig = require("./config/cookie_session/cookie_session_config");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(session(sessionConfig.sessionConfig));

app.use("/", router);
app.use("/member", memberRouter);

app.listen(3000,()=>{console.log("3000 server")});