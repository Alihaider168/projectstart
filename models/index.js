const mongoose = require("mongoose");
var commonModel = require("./discriminator.js");
const index = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
});
const indexModel = commonModel.discriminator("index", index);
module.exports = indexModel;
