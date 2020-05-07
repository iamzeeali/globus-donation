const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const random = require('mongoose-simple-random')

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        //to allow for nested getReviews on tour (small hack)
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();


        const docs = await features.query;

        res.status(200).json({
            status: "success",
            result: docs.length,
            data: docs
        });
    });

exports.getTotalNo = Model =>
    catchAsync(async (req, res, next) => {
        //to allow for nested getReviews on tour (small hack)
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()


        const docs = await features.query;

        res.status(200).json({
            status: "success",
            result: docs.length,
            data: docs
        });
    });


// Model.aggregate([{ $match: { limit: 10 } }])
//exports.getAll2 = Model =>
// catchAsync(async (req, res, next) => {
//     //to allow for nested getReviews on tour (small hack)
//     let filter = {};
//     if (req.params.tourId) filter = { tour: req.params.tourId };

//     const features = new APIFeatures(Model.find(filter), req.query, Model.aggregate([{ $sample: { limit: 10 } }]))
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();

//         handlerFacory me kahe ungli karra getAll2 naya bna diye controller me kahan use kare 

//     const docs = await features.query;

//     res.status(200).json({
//         status: "success",
//         result: docs.length,
//         data: docs
//     });
// });

exports.getOne = (Model, populateOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (populateOptions) {
            query = query.populate(populateOptions);
        }
        const doc = await query;

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: doc
        });
    });

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "success",
            data: doc
        });
    });

exports.updateOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: doc
        });
    });

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }
        res.status(204).json({
            status: "success",
            data: null
        });
    });
