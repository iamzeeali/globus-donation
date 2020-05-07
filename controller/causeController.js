const Cause = require("../model/causeModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createCause = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { cause, startDate } = req.body;
  try {
    const newCause = new Cause({
      cause,
      startDate,
      organisation: req.user.organisation && req.user.organisation.id,
      handle: req.user.organisation && req.user.organisation.handle,
    });

    const doc = await newCause.save();
    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

exports.getAllCauses = catchAsync(async (req, res, next) => {
  const docs = await Cause.find({
    handle: req.user.organisation && req.user.organisation.handle,
  }).sort({ cause: 1 });
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

exports.getCause = factory.getOne(Cause);
exports.updateCause = factory.updateOne(Cause);
exports.deleteCause = factory.deleteOne(Cause);
