const express = require("express");
const stateController = require("./../controller/stateController");

const router = express.Router();

router
  .route("/")
  .get(stateController.getAllStates)
  .post(stateController.createState);

router
  .route("/:id")
  .get(stateController.getState)
  .patch(stateController.updateState)
  .delete(stateController.deleteState);

module.exports = router;
