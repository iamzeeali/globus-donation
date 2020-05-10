const Organisation = require("../model/organisatioModel");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

//Get  organisation by handle
exports.getOrgByHandle = catchAsync(async (req, res, next) => {
  let handle = req.params.handle && req.params.handle;

  const doc = await Organisation.findOne({
    handle: handle,
  });

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

//exports.createOrganisation = factory.createOne(Organisation);
exports.getAllOrganisations = factory.getAll(Organisation);
exports.getOrganisation = factory.getOne(Organisation);
exports.updateOrganisation = factory.updateOne(Organisation);
exports.deleteOrganisation = factory.deleteOne(Organisation);
