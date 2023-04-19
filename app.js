const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./routes"); //claims router object from routes.js

app.use(cors());
app.use("/api", routes);

app.listen(3006);
