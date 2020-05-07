const express = require("express");
const causeController = require("./../controller/causeController");
const authController = require("../controller/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(causeController.getAllCauses)
  .post(causeController.createCause);

router
  .route("/:id")
  .get(causeController.getCause)
  .patch(causeController.updateCause)
  .delete(causeController.deleteCause);

module.exports = router;
