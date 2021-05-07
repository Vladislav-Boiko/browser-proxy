const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.get("/test1", (req, res) => {
  res.send("Hello World!");
});

app.get("/request-header-1", (req, res) => {
  res.send("server response");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
