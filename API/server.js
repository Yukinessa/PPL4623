const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mainRoute = require("./src/routes");
require("dotenv").config();

const { CLIENT_APP_URL, APP_PORT } = process.env;
const app = express();
const allowedOrigins = [
  CLIENT_APP_URL,
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) =>
  res.status(200).json({
    message: "hello world",
  })
);

app.use("/", mainRoute);

app.listen(APP_PORT, () =>
  console.log(`[LOG] you're app runnin on port ${APP_PORT}`)
);
