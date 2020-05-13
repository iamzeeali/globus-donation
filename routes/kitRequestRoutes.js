const express = require("express");
const kitrequestController = require("./../controller/kitReqController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.protect, kitrequestController.getAllKitRequests)
  .post(kitrequestController.createKitRequest);

router.route("/total").get(kitrequestController.totalKitReq);
router
  .route("/totalAdmin")
  .get(authController.protect, kitrequestController.totalKitReqAdmin);

router
  .route("/:id")
  .get(kitrequestController.getKitRequest)
  .patch(kitrequestController.updateKitRequest)
  .delete(kitrequestController.deleteKitRequest);

module.exports = router;
