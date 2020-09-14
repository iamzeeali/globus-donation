const express = require("express");
const donationController = require("../controller/donationController");
const authController = require("../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");

//const pdf = require('html-pdf');
//const invmonthPdf = require('../documentPDF/investMonth.js');

const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
var path = require("path");
const Investment = require("../model/donationModel");

router.route("/guestDonations").get(donationController.getGuestsDonations);
router
  .route("/getGuestDonationsSum")
  .get(donationController.getGuestDonationsSum);

//Restrict all router after this middleware to admin only- Authorization

router.route("/getAll").get(donationController.getAllInvestments);
router
  .route("/total/:id")
  .get(
    authController.restrictTo("admin", "user"),
    donationController.getTotalInvestments
  );

router
  .route("/Usertotal/:id")
  .get(
    authController.restrictTo("admin", "user"),
    donationController.getUsersTotalInvestments
  );
router
  .route("/monthTotal/:year")
  .get(
    authController.restrictTo("admin", "user"),
    donationController.getMonthInvestments
  );
router
  .route("/usermonthTotal/:year/:id")
  .get(
    authController.restrictTo("admin", "user"),
    donationController.getUserMonthInvestments
  );
router
  .route("/filter/:id")
  .get(
    authController.restrictTo("admin", "user"),
    donationController.getFilteredInvestments
  );

router
  .route("/getOverAllSum")
  .get(authController.protect, donationController.getOverAllSumInvestments);

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
    cb(null, true);
  },
});

const resizeReciptPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `InvRecipt-${Date.now()}.jpeg`;

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

// Post Investment

router.route("/").post(
  authController.restrictTo("admin"),
  upload.single("image"),
  resizeReciptPhoto,
  catchAsync(async (req, res, next) => {
    const { cause, amount, investor, country, date, image } = req.body;
    try {
      const newInvestment = new Investment({
        cause,
        amount,
        date,
        investor,
        country,
        user: req.user.id,
        username: req.user.username,
        image: req.file ? req.file.filename : image,
        handle: req.user.organisation && req.user.organisation.handle,
        organisation: req.user.organisation && req.user.organisation.id,
      });

      const doc = newInvestment.save();
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

// Update Investment

router.route("/:id").patch(
  authController.restrictTo("admin"),
  upload.single("image"),
  resizeReciptPhoto,
  catchAsync(async (req, res, next) => {
    const {
      cause,
      amount,
      investor,
      currency,
      country,
      date,
      image,
    } = req.body;

    const doc = await Investment.findByIdAndUpdate(req.params.id, {
      cause,
      amount,
      currency,
      date,
      investor,
      country,
      new: true,
      runValidators: true,
      user: req.user.id,
      username: req.user.username,
      image: req.file ? req.file.filename : image,
      handle: req.user.organisation && req.user.organisation.handle,
      organisation: req.user.organisation && req.user.organisation.id,
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

//Restrict all router after this middleware to admin only- Authorization
router
  .route("/")
  .get(
    authController.restrictTo("admin"),
    donationController.getUserInvestments
  );

router
  .route("/:id")
  .get(authController.restrictTo("admin"), donationController.getInvestment)
  .delete(
    authController.restrictTo("admin"),
    donationController.deleteInvestment
  );

module.exports = router;
