const State = require("../model/stateModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createState = factory.createOne(State);
exports.getAllStates = catchAsync(async (req, res, next) => {
  const docs = await State.find().sort({ state: 1 });
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

exports.getState = factory.getOne(State);

exports.updateState = factory.updateOne(State);
exports.deleteState = factory.deleteOne(State);
