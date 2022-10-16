const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { connect } = require("./src/config/db");
const bodyParser = require("body-parser");
// const userRoute = require("./routes/user");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8080;
const morgan = require("morgan");
connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("common"));
//router
app.use("/user", require("./src/routes/user"));
app.use("/category", require("./src/routes/category"));
app.use("/product", require("./src/routes/product"));
app.use("/order", require("./src/routes/order"));

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
