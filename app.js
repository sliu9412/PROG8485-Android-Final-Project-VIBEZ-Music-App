const express = require("express");
require('express-async-errors');
const bodyParser = require("body-parser");
const app = express();
const settings = require("./settings");
const middleware = require("./middleware");
const apis = require("./apis");

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// middleware
app.use(middleware);

// apis
app.use("/apis", apis);

const router = express.Router();
router.post("/auth", (req, res) => {
  console.log(req);
});
app.use("/spotify", router);

app.use((err, req, res, next) => {
  console.error('APP global error handler: ', err);
});

app.listen(settings.server.port, settings.server.host, () => {
  console.log(
    `App is running at http://${settings.server.host}:${settings.server.port}`
  );
});
