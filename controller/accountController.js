const Account = require("../model/payByAccount");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

//exports.createAccount = factory.createOne(Account);
exports.getAllAccounts = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Account.find({
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

exports.getAccount = factory.getOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);

//Get Account
exports.getOrgAccounts = catchAsync(async (req, res, next) => {
  console.log(req.user.organisation.handle);

  const features = await new APIFeatures(
    Account.find({
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

// Post Account

exports.createAccount = catchAsync(async (req, res, next) => {
  const { accountName, accountNo, ifsc, bankName, bankBranch } = req.body;
  try {
    const newAccount = new Account({
      handle: req.user.organisation && req.user.organisation.handle,
      accountName,
      accountNo,
      ifsc,
      bankName,
      bankBranch,
      user: req.user.id,
    });

    const doc = await newAccount.save();
    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
