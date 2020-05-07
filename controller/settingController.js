const Grocery = require("../model/kitTypeModel");
const catchAsync = require("../utils/catchAsync");

// Create or Update Setting
exports.createSetting = catchAsync(async (req, res, next) => {
  const { default_grocery } = req.body;

  console.log(default_grocery);

  try {
    let groceries = await Grocery.updateMany({ active: false });
    res.json(groceries);

    let grocery = await Grocery.findByIdAndUpdate(
      default_grocery,
      { active: true },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(grocery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
