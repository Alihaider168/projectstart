const mongoose = require("mongoose");

const baseConfig = {
  discriminatorKey: "_type",
  collection: "alldata"
};

const commonModel = mongoose.model(
  "Common",
  new mongoose.Schema({}, baseConfig)
);

module.exports = commonModel;
