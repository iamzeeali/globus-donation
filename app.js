const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
var path = require("path");

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const app = express();

const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const donationRouter = require("./routes/donationRoutes");
const deliveryRouter = require("./routes/deliveryRoutes");
const accountRouter = require("./routes/accountRoutes");
const upiRouter = require("./routes/upiRoutes");
const whatsappRouter = require("./routes/whatsappRoutes");
const kitRouter = require("./routes/kitRoutes");
const settingRouter = require("./routes/settingRoutes");
const organisationRouter = require("./routes/organisationRoutes");
const kitRequestRouter = require("./routes/kitRequestRoutes");
const contactUsRouter = require("./routes/contactUsRoutes");
const cityRouter = require("./routes/cityRoutes");
const stateRouter = require("./routes/stateRoutes");
const causeRouter = require("./routes/causeRoutes");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"));

// -----CORS----

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

// Initialize CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//-- Upload Setup----
app.use(express.static(path.join(__dirname, "./client/public")));

app.use("/public", express.static(__dirname + "/public"));

// app.use(express.static(path.join(__dirname, './client/public/')));

// *********************GLOBAL MIDDLEWARES*******************************

//set security http headers
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit request from same IP
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));

//Data sanitization against Nosql query injections
app.use(mongoSanitize());

//Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

app.use(compression());

//***************************/ROUTES***********************************

app.use("/api/user", userRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/investment", donationRouter);
app.use("/api/delivery", deliveryRouter);
app.use("/api/account", accountRouter);
app.use("/api/upi", upiRouter);
app.use("/api/whatsgroup", whatsappRouter);
app.use("/api/kitType", kitRouter);
app.use("/api/setting", settingRouter);
app.use("/api/organisation", organisationRouter);
app.use("/api/kitRequest", kitRequestRouter);
app.use("/api/contactus", contactUsRouter);
app.use("/api/city", cityRouter);
app.use("/api/state", stateRouter);
app.use("/api/cause", causeRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

//todo develper Globus Labs
