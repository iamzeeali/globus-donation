const express = require("express");
const organisationController = require("./../controller/organisationController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
var path = require("path");
const Organisation = require("../model/organisatioModel");

//Protect all routes after this middleware- Authentication
//router.use(authController.protect);

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
  req.file.filename = `orgavatar-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(1000, 1000, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("png")
    .png({ quality: 80 })
    .toFile(
      path.join(
        __dirname,
        `../client/public/uploads/organisation/${req.file.filename}`
      )
    );
  next();
};

// Post Organisation

router.route("/").post(
  upload.single("logo"),
  resizeReciptPhoto,
  catchAsync(async (req, res, next) => {
    const {
      orgName,
      handle,
      state,
      city,
      address,
      email,
      website,
      phone,
      logo,
      dashMsg,
    } = req.body;
    try {
      const newOrganisation = new Organisation({
        orgName,
        handle,
        city,
        state,
        city,
        address,
        website,
        phone,
        email,
        dashMsg,
        logo: req.file ? req.file.filename : logo,
      });

      const doc = newOrganisation.save();
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
      res.status(500).send(err.message);
    }
  })
);

// Update Organisation

router.route("/:id").patch(
  upload.single("logo"),
  resizeReciptPhoto,
  catchAsync(async (req, res, next) => {
    const {
      orgName,
      handle,
      state,
      city,
      address,
      email,
      website,
      phone,
      logo,
      dashMsg,
    } = req.body;

    const doc = await Organisation.findByIdAndUpdate(req.params.id, {
      orgName,
      handle,
      city,
      state,
      city,
      address,
      website,
      phone,
      email,
      dashMsg,
      new: true,
      runValidators: true,
      logo: req.file ? req.file.filename : logo,
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
  .route("/getOrgByHandle/:handle")
  .get(organisationController.getOrgByHandle);

router.route("/").get(organisationController.getAllOrganisations);

router
  .route("/:id")
  .get(organisationController.getOrganisation)
  .patch(organisationController.updateOrganisation)
  .delete(organisationController.deleteOrganisation);

module.exports = router;
