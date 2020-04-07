const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT | 5000;
const routes = require("./routes/routes");
const { mongoConnect } = require("./config/dbConnection");
const errorHandler = require("./Handlers/errorHandler");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
const sanitize = require("express-mongo-sanitize");

mongoConnect();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/", routes);

// sanetize data
app.use(sanitize());

// security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent hpp attacks
app.use(hpp());

app.use(cors());

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledPromiseRejection", () => {
  server.close(() => process.exit(1));
});
