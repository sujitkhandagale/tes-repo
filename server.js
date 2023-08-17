const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const SSLKEY = fs.readFileSync("./ssl/privatekey.pem", "utf8");
const CERTIFICATE = fs.readFileSync("./ssl/certificate.pem", "utf8");
const SSLCREDENTIALS = { key: SSLKEY, cert: CERTIFICATE };
const httpsServerOnly = https.createServer(SSLCREDENTIALS, app);
app.post("/", (req, res) => {
  res.send("SSL Status" + " " + req.connection.encrypted);
});

// run only on https
httpsServerOnly.listen(5000, () => {
  console.log("Server is running on port 5000");
});
