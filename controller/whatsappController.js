const WhatsGroup = require("../model/whatsappModel");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

//exports.createWhatsGroup = factory.createOne(WhatsGroup);
exports.getAdminWhatsGroup = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    WhatsGroup.find({
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

exports.getWhatsGroup = factory.getOne(WhatsGroup);
exports.updateWhatsGroup = factory.updateOne(WhatsGroup);
exports.deleteWhatsGroup = factory.deleteOne(WhatsGroup);

//Get WhatsGroup
exports.getAllWhatsGroups = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    WhatsGroup.find({
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

// Post WhatsGroup

exports.createWhatsGroup = catchAsync(async (req, res, next) => {
  const { groupLink, desc } = req.body;
  try {
    const newWhatsGroup = new WhatsGroup({
      groupLink,
      desc,
      handle: req.user.organisation && req.user.organisation.handle,
    });

    const doc = await newWhatsGroup.save();
    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Total WhatsGroup Kit

exports.totalWhatsGroups = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    WhatsGroup.aggregate([
      {
        $group: {
          _id: null,
          totalWhatsGroup: { $sum: "$rationKit" },
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
