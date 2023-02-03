const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const fileUpload = require("express-fileupload");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tenantRoutes = require("./routes/tenantRoutes");
const flatOwnerRoutes = require("./routes/flatOwnerRoutes");
const roomRoutes = require("./routes/roomRoutes");
const requestRoutes = require("./routes/requestRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

//express.json is used for reading data from the body into req.body
// app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

app.use(fileUpload());

// All routes
app.use("/api/v1/tenants", tenantRoutes);
app.use("/api/v1/flatOwners", flatOwnerRoutes);
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/requests", requestRoutes);
// app.use("/api/v1/projects", projectRoutes);
// app.use("/api/v1/notifications", notificationRoutes);

// Handling undefined routes
app.all("*", (req, res, next) => {
  //next is used in a special way
  //If the next () recieves an argument, then express gets to know that there is an error
  //Here if argument given in next(), it will skip all the middlwares in the stack and will directly go to global error handling middleware
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// ----------DEPLOYMENT-------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV !== "DEVELOPMENT") {
// 	app.use(express.static("frontend/build"));

// 	app.get("*", (req, res) => {
// 		res.sendFile(
// 			path.resolve(__dirname1, "frontend", "build", "index.html")
// 		);
// 	});
// }

app.use(globalErrorHandler);

module.exports = app;
