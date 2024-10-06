const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const adminRoutes = require("./routes/adminUsers");
const frameRoutes = require("./routes/framesRoutes");
const lensRoutes = require("./routes/lensRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
//cors
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
//josnReader
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//loginRoutes
app.use("/api/users", adminRoutes);
//frameCrudRoutes
app.use("/api/frames", frameRoutes);
//lensCrudRoutes
app.use("/api/lens", lensRoutes);
//customerRoutes
app.use("/api/customers", customerRoutes);
//ordersRoutes
app.use("/api/orders",orderRoutes);
//errorHandlerMiddleWares
app.use(errorHandler);
app.use(notFound);

module.exports = app;
