const express = require("express");
const kitController = require("../controller/kitController");
const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

router
  .route("/")
  .get(authController.restrictTo("admin"), kitController.getAllGrocerys)
  .post(authController.restrictTo("admin"), kitController.createGrocery);

router
  .route("/:id")
  .get(authController.restrictTo("admin"), kitController.getGrocery)
  .patch(authController.restrictTo("admin"), kitController.updateGrocery)
  .delete(authController.restrictTo("admin"), kitController.deleteGrocery);

module.exports = router;
