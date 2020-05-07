const Ration = require("../model/deliveryModel");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

// exports.createRation = factory.createOne(Ration);
exports.createRation = catchAsync(async (req, res, next) => {
  const {
    cause,
    kitType,
    kitQuantity,
    state,
    city,
    area,
    road,
    landmark,
    houseNo,
    description,
  } = req.body;
  try {
    const newRation = new Ration({
      cause,
      kitType,
      kitQuantity,
      state,
      city,
      area,
      road,
      landmark,
      houseNo,
      description,
      user: req.user.id,
      organisation: req.user.organisation && req.user.organisation.id,
      handle: req.user.organisation && req.user.organisation.handle,
    });

    const doc = await newRation.save();
    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

exports.getAllRations = factory.getAll(Ration);
exports.getRation = factory.getOne(Ration);
exports.updateRation = factory.updateOne(Ration);
exports.deleteRation = factory.deleteOne(Ration);

//Get All deliveries by organisation for guests
exports.getAllByOrgGuest = catchAsync(async (req, res, next) => {
  let handle = req.query.handle;
  const features = await new APIFeatures(
    Ration.find({
      handle: handle,
    }),
    req.query
  )
    .sort()
    .paginate()
    .filter();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

//Get All deliveries by organisation for admin
exports.getAllByOrg = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Ration.find({
      organisation: req.user.organisation && req.user.organisation.id,
    }),
    req.query
  )
    .sort()
    .paginate()
    .filter();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

//Get Ration
exports.getUserRations = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Ration.find({ user: req.user.id }),
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

// Total Guest Ration Kit
exports.guestsTotal = catchAsync(async (req, res, next) => {
  handle = req.query.handle;
  const features = await new APIFeatures(
    Ration.aggregate([
      { $match: { handle: handle } },
      {
        $group: {
          _id: null,
          totalRation: { $sum: "$kitQuantity" },
        },
      },
    ]),
    req.query
  ).paginate();

  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

// Total Ration Kit
exports.totalRations = catchAsync(async (req, res, next) => {
  let handle = req.user.organisation && req.user.organisation.handle;
  const features = await new APIFeatures(
    Ration.aggregate([
      { $match: { handle: handle } },
      {
        $group: {
          _id: null,
          totalRation: { $sum: "$kitQuantity" },
        },
      },
    ]),
    req.query
  ).paginate();

  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

//Search Delivery
exports.searchDelivery = catchAsync(async (req, res, next) => {
  try {
    const features = await new APIFeatures(
      Ration.find({
        $text: { $search: req.body.searchString },
      }),
      req.query
    ).filter();

    const docs = await features.query;
    res.status(200).json({
      status: "success",
      result: docs.length,
      data: docs,
    });
  } catch (error) {
    console.log(error.message);
  }

  next();
});
