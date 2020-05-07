const express = require("express");
const whatsgroupController = require("./../controller/whatsappController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(whatsgroupController.getAllWhatsGroups);

router.route("/total").get(whatsgroupController.totalWhatsGroups);

//Protect all routes after this middleware- Authentication
router.use(authController.protect);
router.route("/getAll").get(whatsgroupController.getAdminWhatsGroup);

router
  .route("/")
  .post(
    authController.restrictTo("admin"),
    whatsgroupController.createWhatsGroup
  );

router
  .route("/:id")
  .get(authController.restrictTo("admin"), whatsgroupController.getWhatsGroup)
  .patch(
    authController.restrictTo("admin"),
    whatsgroupController.updateWhatsGroup
  )
  .delete(
    authController.restrictTo("admin"),
    whatsgroupController.deleteWhatsGroup
  );

module.exports = router;
