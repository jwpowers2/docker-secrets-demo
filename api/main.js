const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/client/dist"));
app.use(express.json());

require("./server/config/routes.js")(app);

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});