const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mainRoute = require("./src/routes");
const port = process.env.PORT || 3000;
require("dotenv").config();

const { CLIENT_APP_URL } = process.env;
const app = express();
const allowedOrigins = [CLIENT_APP_URL, "http://localhost:3000"];

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

app.listen(port, () => console.log(`[LOG] you're app runnin on port ${port}`));
