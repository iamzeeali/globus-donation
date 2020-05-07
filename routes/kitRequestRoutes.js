const express = require("express");
const kitrequestController = require("./../controller/kitReqController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
// router.use(authController.protect);

router
    .route("/")
    .get(kitrequestController.getAllKitRequests)
    .post(kitrequestController.createKitRequest);

router
    .route("/:id")
    .get(kitrequestController.getKitRequest)
    .patch(kitrequestController.updateKitRequest)
    .delete(kitrequestController.deleteKitRequest);

module.exports = router;
