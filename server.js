/**
 * Creating Simple Middleware App
 * Author Name : Jeevan Vaishnav
 * Date : 17-01-2023
 *
 */

const express = require("express");
const path = require("path");

const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  console.log("Request Date :" + new Date());
  next();
  //   res.send("Middleware App");
  //   res.sendFile();
  //   res.end();
});

app.use(function (req, res, next) {
  var filepath = path.join(__dirname, "static", req.url);
  fs.stat(filepath, function (err, fileinfo) {
    if (err) {
      next();
      return;
    }

    if (fileinfo.isFile()) {
      res.sendFile(filepath);
    } else {
      next();
    }
  });
});

//middleware functino
app.use(function (req, res) {
  res.status(404);
  res.send("File Not Found!");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

// 1 Middleware
// Serving Static Files : 5:6
