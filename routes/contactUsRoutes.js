const express = require("express");
const contactUsController = require("../controller/contactUsController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
// router.use(authController.protect);

router
  .route("/")
  .get(contactUsController.getAllContactUss)
  .post(contactUsController.createContactUs);

router
  .route("/:id")
  .get(contactUsController.getContactUs)
  .patch(contactUsController.updateContactUs)
  .delete(contactUsController.deleteContactUs);

module.exports = router;
