// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// DB Setup and fixing deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/auth",
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      console.log("*Can't connect to server.*");
    }
  }
);

// App setup
app.use(morgan("combined"));
app.use(cors());
// app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port:", port);
