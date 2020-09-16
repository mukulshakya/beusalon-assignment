const express = require("express");
const app = express();
const mongoose = require("mongoose");
process.env["NODE_CONFIG_DIR"] = __dirname + "/config";
const {
  db: { url, options },
} = require("config");

// Middlewares
app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  Object.assign(res, require("./utils/responseSender"));
  next();
});

// DB connection
const uri = process.env.NODE_ENV === "production" ? url.production : url.local;
mongoose
  .connect(uri, options)
  .then(async () => {
    console.log("Mongoose connection success");

    // SEED PRODUCTS
    // const db = require("./models");
    // const seedingData = require("./config/seedingData");

    // const users = [...seedingData];
    // const orders = users.flatMap((user) => user.getOrders());

    // await db.User.deleteMany({});
    // await db.Order.deleteMany({});
    // await db.User.insertMany(users);
    // await db.Order.insertMany(orders);
  })
  .catch((e) => console.log("Mongoose connection error", e.message));

// Routes
app.use("/v1", require("./api/v1"));

app.get("/", (req, res) => {
  res.success();
});

// Uncaught Error handler
app.use(async (error, req, res, next) => {
  return res.error(error);
});

const port = process.env.PORT || 6060;
app.listen(port, () => console.log("Server up on port", port));
