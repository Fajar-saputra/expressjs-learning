const express = require("express");

const app = express();
const routes = express.Router();

app.get("/", (req, res) => res.send("belajar lagi"));

app.listen(3000, () => console.log("server running in 3000"));
