const express = require("express");
const mongoose = require("mongoose"); 
const path = require("path");
require("dotenv").config();

const app = express();
app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));

const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

mongoose.connect(process.env.URI, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("connected to db"))
    .catch(() => console.error("db not connected"))

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const paymentRoute = require("./routes/paymentRoute");
const orderRoute = require("./routes/orderRoute");
const appRoute = require("./routes/appRoute");
app.use("/", authRoute);
app.use("/profile", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/payment", paymentRoute);
app.use("/order", orderRoute);
app.use("/app", appRoute);
