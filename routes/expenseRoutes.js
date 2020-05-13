const express = require("express");
const expenseController = require("./../controller/expenseController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const sharp = require("sharp");
// const cloudinary = require("cloudinary");
var path = require("path");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
const Expense = require("../model/expenseModel");

//Restrict all router after this middleware to admin only- Authorization

//Restrict all router after this middleware to admin only- Authorization

router.route("/guestExpenses").get(expenseController.getGuestsExpenses);
router.route("/getGuestExpenseSum").get(expenseController.getGuestExpenseSum);

router.route("/getAll").get(expenseController.getAllExpenses);

router
  .route("/total/:id")
  .get(
    authController.restrictTo("admin", "user"),
    expenseController.getTotalExpenses
  );

router
  .route("/Usertotal/:id")
  .get(
    authController.restrictTo("admin", "user"),
    expenseController.getUsersTotalExpenses
  );
router
  .route("/monthTotal/:year")
  .get(
    authController.restrictTo("admin", "user"),
    expenseController.getMonthExpenses
  );
router
  .route("/usermonthTotal/:year/:id")
  .get(
    authController.restrictTo("admin", "user"),
    expenseController.getUserMonthExpenses
  );

router
  .route("/filter/:id")
  .get(
    authController.restrictTo("admin", "user"),
    expenseController.getFilteredExpenses
  );

router
  .route("/getOverAllSum")
  .get(authController.protect, expenseController.getOverAllSumExpenses);

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

// Image saved on memmory for image porcessing
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error("Only image files are accepted!"), false);
    }
    // if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    //     req.fileValidationError = "Forbidden extension";
    //     return cb(null, false, req.fileValidationError);
    // }
    cb(null, true);
  },
});

const resizeReciptPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `ExpRecipt-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(1000, 1000, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(
      path.join(__dirname, `../client/public/uploads/${req.file.filename}`)
    );
  next();
};

// Post Expense

router.route("/").post(
  authController.restrictTo("admin"),
  upload.single("image"),
  resizeReciptPhoto,
  catchAsync(async (req, res, next) => {
    const { amount, date, purpose, image, expensor, cause } = req.body;
    try {
      const newExpense = new Expense({
        cause,
        amount,
        date,
        purpose,
        expensor,
        user: req.user.id,
        username: req.user.username,
        image: req.file ? req.file.filename : image,
        organisation: req.user.organisation && req.user.organisation.id,
        handle: req.user.organisation && req.user.organisation.handle,
      });

      const doc = newExpense.save();
      res.status(200).json({
        status: "success",
        doc,
      });
    } catch (err) {
      if (req.fileValidationError) {
        console.log("Invalid File type Only Image file Accepted");
        return res.status(400).send({
          msg: "Invalid File type Only Image file Accepted",
          success: false,
        });
      }
      res.status(500).send(err);
    }
  })
);

// Update Expense

router.route("/:id").patch(
  authController.restrictTo("admin"),
  upload.single("image"),
  resizeReciptPhoto,
  catchAsync(async (req, res, next) => {
    const { amount, date, image, purpose, expensor } = req.body;

    const doc = await Expense.findByIdAndUpdate(req.params.id, {
      amount,
      date,
      purpose,
      expensor,
      new: true,
      runValidators: true,
      user: req.user.id,
      username: req.user.username,
      image: req.file ? req.file.filename : image,
      organisation: req.user.organisation && req.user.organisation.id,
      handle: req.user.organisation && req.user.organisation.handle,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    if (req.fileValidationError) {
      console.log("Invalid File type Only Image file Accepted");
      return res.status(400).send({
        msg: "Invalid File type Only Image file Accepted",
        success: false,
      });
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  })
);

router
  .route("/")
  .get(authController.restrictTo("admin"), expenseController.getUserExpenses);

router
  .route("/:id")
  .get(authController.restrictTo("admin"), expenseController.getExpense)
  .delete(authController.restrictTo("admin"), expenseController.deleteExpense);

module.exports = router;
