const express = require("express");
const deliveryController = require("../controller/deliveryController");
const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router.route("/getAll").get(deliveryController.getAllRations);
router.route("/guestsTotal").get(deliveryController.guestsTotal);
router.route("/getAllByOrgGuest").get(deliveryController.getAllByOrgGuest);

//Protect all routes after this middleware- Authentication
router.use(authController.protect);
router.route("/total").get(deliveryController.totalRations);

router.route("/getAllByOrg").get(deliveryController.getAllByOrg);

router
  .route("/")
  .get(
    authController.restrictTo("admin", "deliveryboy"),
    deliveryController.getAllRations
  )
  .post(
    authController.restrictTo("admin", "deliveryboy"),
    deliveryController.createRation
  );

router.route("/searchDelivery").post(deliveryController.searchDelivery);

router
  .route("/:id")
  .get(authController.restrictTo("admin"), deliveryController.getRation)
  .patch(authController.restrictTo("admin"), deliveryController.updateRation)
  .delete(authController.restrictTo("admin"), deliveryController.deleteRation);

module.exports = router;
