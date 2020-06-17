const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
let { mongoose } = require("./db.js");
let router = require("./controller/emp_controller.js");

const PORT = 3000;

let app = express();

app.use(body_parser.json());
app.use(cors({ origin: "http://localhost:4200" }));

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

app.use("/docs", router);