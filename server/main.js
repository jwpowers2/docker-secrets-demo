const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const validateJwt = require("./server/middleware/validateJwt");
const dotenv = require("dotenv").config();
const port = 5000;


app.use(cors({credentials:true, origin: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/client/dist"));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: "hideme",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  })
);
app.use(validateJwt);

require("./server/config/postgresConfig.js");
require("./server/config/routes.js")(app);

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});