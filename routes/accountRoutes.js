const express = require("express");
const accountController = require("../controller/accountController");
const authController = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(accountController.getAllAccounts);

//Protect all routes after this middleware- Authentication
router.use(authController.protect);
router
  .route("/getAll")
  .get(authController.restrictTo("admin"), accountController.getOrgAccounts);

router
  .route("/")
  .post(authController.restrictTo("admin"), accountController.createAccount);

router
  .route("/:id")
  .get(authController.restrictTo("admin"), accountController.getAccount)
  .patch(authController.restrictTo("admin"), accountController.updateAccount)
  .delete(authController.restrictTo("admin"), accountController.deleteAccount);

module.exports = router;
