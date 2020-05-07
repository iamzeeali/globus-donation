const Investment = require("../model/donationModel");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

//exports.createInvestment = factory.createOne(Investment);
exports.getAllInvestments = factory.getAll(Investment);
exports.getInvestment = factory.getOne(Investment);
exports.updateInvestment = factory.updateOne(Investment);
//exports.deleteInvestment = factory.deleteOne(Investment);

exports.deleteInvestment = catchAsync(async (req, res, next) => {
  const doc = await Investment.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

//Get Guest Investment
exports.getGuestsDonations = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(Investment.find(), req.query)
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

//Get Users Investment
exports.getUserInvestments = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Investment.find({ organisation: req.user.organisation.id }),
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

// Get sum of donations for guests
exports.getGuestDonationsSum = catchAsync(async (req, res, next) => {
  let handle = req.query.handle;

  const features = await new APIFeatures(
    Investment.aggregate([
      { $match: { handle: handle } },
      {
        $group: {
          _id: null,
          totalInvest: { $sum: "$amount" },
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

// Get Sum of Over-All Ivestment
exports.getOverAllSumInvestments = catchAsync(async (req, res, next) => {
  let handle = req.user.organisation && req.user.organisation.handle;
  const features = await new APIFeatures(
    Investment.aggregate([
      { $match: { handle: handle } },
      {
        $group: {
          _id: null,
          totalInvest: { $sum: "$amount" },
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

//Get Project Based  Filtered Investment
exports.getFilteredInvestments = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Investment.find({ project: req.params.id }),
    req.query
  )
    .filter()
    .sort()
    .paginate();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

//Get Project Based Total Investment
exports.getTotalInvestments = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Investment.aggregate([
      {
        $match: {
          project: new ObjectId(req.params.id),
        },
      },

      {
        $group: {
          _id: "$project",
          no_of_investment: {
            $sum: 1,
          },
          totalAmount: { $sum: "$amount" },
          project: {
            $push: "$project",
          },
        },
      },
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "projects_docs",
        },
      },
    ]),

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

//Get User Based Total Investment
exports.getUsersTotalInvestments = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Investment.aggregate([
      {
        $match: {
          user: new ObjectId(req.params.id),
        },
      },

      {
        $group: {
          _id: "$user",
          no_of_investment: {
            $sum: 1,
          },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]),

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

// Get Sum of Over-All Ivestment
// exports.getOverAllSumInvestments = catchAsync(async (req, res, next) => {
//   const features = await new APIFeatures(
//     Investment.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalInvest: { $sum: "$amount" },
//         },
//       },
//     ]),
//     req.query
//   ).paginate();

//   const docs = await features.query;
//   res.status(200).json({
//     status: "success",
//     result: docs.length,
//     data: docs,
//   });
// });

//Get Month Wise Investment
exports.getMonthInvestments = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const features = await new APIFeatures(
    Investment.aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          _id: 1,
          convAmt: 1,
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalInvestMonthy: { $sum: "$amount" },
          amount: {
            $push: "$amount",
            //$push: "$user"
          },
        },
      },
      {
        $sort: { _id: 1 },
      },

      {
        $lookup: {
          from: "investments",
          foreignField: "amount",
          localField: "amount",
          as: "invest_docs",
        },
      },

      {
        $match: {
          "_id.year": year,
          // "_id.month": 2
        },
      },
    ]),
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

//Get Month Wise User Investment
exports.getUserMonthInvestments = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const features = await new APIFeatures(
    Investment.aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          _id: 1,
          convAmt: 1,
          user: 1,
        },
      },
      {
        $match: {
          user: new ObjectId(req.params.id),
        },
      },

      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalInvestMonthy: { $sum: "$amount" },
          amount: {
            $push: "$amount",
            //$push: "$user"
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $lookup: {
          from: "investments",
          foreignField: "amount",
          localField: "amount",
          as: "invest_docs",
        },
      },
      {
        $match: {
          "_id.year": year,
          // "_id.month": 2
        },
      },
    ]),
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

// {
//     $lookup: {
//         from: 'investments',
//         //let: { convAmt: "$" },
//         // foreignField: "user",
//         pipeline: [
//              { $match: { $expr: "$convAmt" } },
//             {
//                 $group: { _id: { year: "$year", month: "$month", conv: "$convAmt" } }
//             },

//         ],
//         "as": 'users_docs'
//     },

// },

// {
//     $lookup: {
//         from: 'investments',
//         foreignField: "convAmt",
//         localField: "amount",
//         "as": 'users_docs'
//     },

// },
