const path = require("path");
const fs = require("fs");
global.appRoot = path.resolve(__dirname);
const indexModel = require("../models/index.js");

const config = require(path.join(global.appRoot, "../config.js"));

exports.add_app = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(config.App.httpStatuses.OK).json({
        status: "DATA_MISSING",
        code: config.App.httpStatuses.DATA_MISSING,
      });
    }
    // check data from database
    let isCustomer = await indexModel.findOne({ name: name });
    // if object alredy created
    if (isCustomer) {
      return res.status(config.App.httpStatuses.OK).json({
        status: "NAME_ALREADY_EXISTS",
        code: config.App.httpStatuses.ALREADY_EXISTS,
      });
    }
    // save object
    let saveCustomer = await new indexModel(req.body).save();

    return res.status(config.App.httpStatuses.OK).json({
      status: "SUCCESS",
      code: config.App.httpStatuses.OK,
    });
  } catch (err) {
    console.log(err);
    return res.status(config.App.httpStatuses.INTERNAL_SERVER_ERROR).json({
      status: "INTERNAL_SERVER_ERROR",
      code: config.App.httpStatuses.INTERNAL_SERVER_ERROR,
    });
  }
};

exports.update_status = async (req, res) => {
  try {
    const { status, id } = req.body;
    console.log(req.body);
    if (!id) {
      return res.status(config.App.httpStatuses.OK).json({
        status: "DATA_MISSING",
        code: config.App.httpStatuses.DATA_MISSING,
      });
    }

    const updateApp = await indexModel.updateOne(
      { _id: id },
      { $set: { status: status } }
    );
    if (!updateApp.n) {
      return res.status(config.App.httpStatuses.OK).json({
        status: "APP_NOT_FOUND",
        code: config.App.httpStatuses.NOT_FOUND,
      });
    }
    return res.status(config.App.httpStatuses.OK).json({
      status: "SUCCESS",
      code: config.App.httpStatuses.OK,
    });
  } catch (err) {
    console.log(err);
    return res.status(config.App.httpStatuses.INTERNAL_SERVER_ERROR).json({
      status: "INTERNAL_SERVER_ERROR",
      code: config.App.httpStatuses.INTERNAL_SERVER_ERROR,
    });
  }
};

exports.fetch_All_Apps = async (req, res) => {
  try {
    let appsRecords = await indexModel.find({}, { _type: 0, __v: 0 });

    return res.status(config.App.httpStatuses.OK).json({
      status: "SUCCESS",
      code: config.App.httpStatuses.OK,
      data: appsRecords,
    });
  } catch (err) {
    console.log(err);
    return res.status(config.App.httpStatuses.INTERNAL_SERVER_ERROR).json({
      status: "INTERNAL_SERVER_ERROR",
      code: config.App.httpStatuses.INTERNAL_SERVER_ERROR,
    });
  }
};

exports.delete_app = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(config.App.httpStatuses.OK).json({
        status: "DATA_MISSING",
        code: config.App.httpStatuses.DATA_MISSING,
      });
    }
    const isCustomerDelete = await indexModel.deleteOne({
      _id: id,
    });
    if (isCustomerDelete.deletedCount === 0) {
      return res.status(config.App.httpStatuses.OK).json({
        status: "USER_NOT_FOUND",
        code: config.App.httpStatuses.NOT_FOUND,
      });
    }
    return res.status(config.App.httpStatuses.OK).json({
      status: "SUCCESS",
      code: config.App.httpStatuses.OK,
    });
  } catch (err) {
    return res.status(config.App.httpStatuses.INTERNAL_SERVER_ERROR).json({
      status: "INTERNAL_SERVER_ERROR",
      code: config.App.httpStatuses.INTERNAL_SERVER_ERROR,
    });
  }
};
