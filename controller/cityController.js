const City = require("../model/cityModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.createCity = catchAsync(async (req, res, next) => {
  const { city, areas, state } = req.body;

  const cityFields = {};
  //   cityFields.user = req.user.id;

  if (city) cityFields.city = city;
  if (state) cityFields.state = state;
  if (areas) {
    cityFields.areas = areas
      .toString()
      .split(",")
      .map((area) => area.trim());
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let city = await City.create(cityFields);
    res.json(city);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});

exports.getAllCities = factory.getAll(City);
exports.getCity = factory.getOne(City);

exports.updateCity = catchAsync(async (req, res, next) => {
  const { city, areas, state } = req.body;

  const cityFields = {};
  //   cityFields.user = req.user.id;

  if (city) cityFields.city = city;
  if (state) cityFields.state = state;
  if (areas) {
    cityFields.areas = areas
      .toString()
      .split(",")
      .map((area) => area.trim());
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let city = await City.findByIdAndUpdate(req.params.id, cityFields, {
      new: true,
      runValidators: true,
    });
    res.json(city);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});

exports.deleteCity = factory.deleteOne(City);
