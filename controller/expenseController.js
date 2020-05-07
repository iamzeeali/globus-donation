const Expense = require("../model/expenseModel");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const ObjectId = require("mongodb").ObjectID;

//exports.createExpense = factory.createOne(Expense);
exports.getAllExpenses = factory.getAll(Expense);
exports.getExpense = factory.getOne(Expense);
exports.updateExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);

//Get Expenses
exports.getUserExpenses = catchAsync(async (req, res, next) => {
  console.log(req.user.organisation.id);
  const features = await new APIFeatures(
    Expense.find({ organisation: req.user.organisation.id }),
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

//Get Guest Investment
exports.getGuestsExpenses = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(Expense.find(), req.query)
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

// Get sum of expenses for guests
exports.getGuestExpenseSum = catchAsync(async (req, res, next) => {
  let handle = req.query.handle;

  const features = await new APIFeatures(
    Expense.aggregate([
      { $match: { handle: handle } },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
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

// Get Sum of Over-All Expenses
exports.getOverAllSumExpenses = catchAsync(async (req, res, next) => {
  let handle = req.user.organisation && req.user.organisation.handle;

  const features = await new APIFeatures(
    Expense.aggregate([
      { $match: { handle: handle } },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
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

//Get Project Based Filtered Expense
exports.getFilteredExpenses = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Expense.find({ project: req.params.id }),
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

//Get  Project Based Total Expenses
exports.getTotalExpenses = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Expense.aggregate([
      {
        $match: {
          project: new ObjectId(req.params.id),
        },
      },

      {
        $group: {
          _id: "$project",
          no_of_expenses: {
            $sum: 1,
          },
          totalExpense: { $sum: "$amount" },
          project: {
            $push: "$project",
          },
          user: {
            $push: "$user",
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
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "users_docs",
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

//Get User Based Total Expense
exports.getUsersTotalExpenses = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Expense.aggregate([
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

//Get Month Wise Expense
exports.getMonthExpenses = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const features = await new APIFeatures(
    Expense.aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          _id: 1,
          amount: 1,
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalExpenseMonthy: { $sum: "$amount" },
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
          from: "expenses",
          foreignField: "amount",
          localField: "amount",
          as: "expense_docs",
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

//Get Month Wise User Expense
exports.getUserMonthExpenses = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const features = await new APIFeatures(
    Expense.aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          _id: 1,
          amount: 1,
          user: 1,
        },
      },
      {
        $match: { user: new ObjectId(req.params.id) },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalExpUserMonthy: { $sum: "$amount" },
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
          from: "expenses",
          foreignField: "amount",
          localField: "amount",
          as: "expense_docs",
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
