const UPI = require("../model/payByUPI");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

//exports.createUPI = factory.createOne(UPI);
exports.getAllUPIs = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    UPI.find({
      handle: req.query.handle,
    }),
    req.query
  )
    .sort()
    .paginate();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

exports.getAdminAllUPIs = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    UPI.find({
      handle: req.user.organisation && req.user.organisation.handle,
    }),
    req.query
  )
    .sort()
    .paginate();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

exports.getUPI = factory.getOne(UPI);
exports.updateUPI = factory.updateOne(UPI);
//exports.deleteUPI = factory.deleteOne(UPI);

exports.deleteUPI = catchAsync(async (req, res, next) => {
  const doc = await UPI.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

//Get Users UPI
exports.getUserUPIs = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    UPI.find({ handle: req.user.organisation && req.user.organisation.handle }),
    req.query
  )
    .sort()
    .paginate();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});
