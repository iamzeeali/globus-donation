const Grocery = require("../model/kitTypeModel");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

//exports.createGrocery = factory.createOne(Grocery);
exports.getAllGrocerys = factory.getAll(Grocery);
exports.getGrocery = factory.getOne(Grocery);
//exports.updateGrocery = factory.updateOne(Grocery);
exports.deleteGrocery = factory.deleteOne(Grocery);

// Post Grocery
exports.createGrocery = catchAsync(async (req, res, next) => {
  const { kitType, price, items } = req.body;
  const groceryFields = {};
  const handle = req.user.organisation.handle;

  if (kitType) groceryFields.kitType = kitType;
  if (price) groceryFields.price = price;
  if (handle) groceryFields.handle = handle;
  if (items) {
    groceryFields.items = items
      .toString()
      .split(",")
      .map((itm) => itm.trim());
  }
  try {
    // Using upsert option (creates new doc if no match is found):
    let grocery = await Grocery.create(groceryFields);
    console.log(grocery);
    res.json(grocery);
  } catch (err) {
    res.status(500).send(err.message);
  }
  next();
});

// Edit Grocery
exports.updateGrocery = catchAsync(async (req, res, next) => {
  const { kitType, price, items } = req.body;

  // Build profile object
  const groceryFields = {};
  //   activityFields.user = req.user.id;

  if (kitType) groceryFields.kitType = kitType;
  if (price) groceryFields.price = price;
  if (items) {
    groceryFields.items = items
      .toString()
      .split(",")
      .map((itm) => itm.trim());
  }
  try {
    // Using upsert option (creates new doc if no match is found):
    let grocery = await Grocery.findByIdAndUpdate(
      req.params.id,
      groceryFields,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(grocery);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});
