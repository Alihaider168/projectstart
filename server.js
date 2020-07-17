const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const config = require(path.join(global.appRoot, "../config.js"));
connect();
app.use("/", indexRouter);
app.get("*", (req, res) => {
  return res.status(config.App.httpStatuses.NOT_FOUND).json({
    status: "ROUTE_NOT_FOUND",
    code: config.App.httpStatuses.NOT_FOUND,
  });
});

async function connect() {
  try {
    // connection with Azure
    await mongoose.connect(
      "mongodb://" +
        config.App.cosmoDb.COSMOSDB_HOST +
        ":" +
        config.App.cosmoDb.COSMOSDB_PORT +
        "/" +
        config.App.cosmoDb.COSMOSDB_DBNAME +
        "?ssl=true&replicaSet=globaldb",
      {
        auth: {
          user: config.App.cosmoDb.COSMODDB_USER,
          password: config.App.cosmoDb.COSMOSDB_PASSWORD,
        },
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retrywrites: false,
      }
    );

    // connection with local db
    // await mongoose.connect(config.App.MongoServerIp, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   retrywrites: false,
    // });
    console.log("DB_CONNECTED_SUCCESSFULLY");
  } catch (err) {
    console.log(err);
    console.log("DB_NOT_CONNECTED_SUCCESSFULLY");
  }
}

app.listen(process.env.PORT || 3001, () => {
  console.log("all is ok!");
});
