const express = require("express");
const settingController = require("./../controller/settingController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

router
  .route("/")
  .post(authController.restrictTo("admin"), settingController.createSetting);

module.exports = router;
