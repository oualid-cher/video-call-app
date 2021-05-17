const express = require("express");
const app = express();
const server = require("http").createServer(app);

// app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on PORT:${PORT}`));
