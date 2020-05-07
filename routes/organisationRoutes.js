const express = require("express");
const organisationController = require("./../controller/organisationController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
// router.use(authController.protect);
router
  .route("/getOrgByHandle/:handle")
  .get(organisationController.getOrgByHandle);

router
  .route("/")
  .get(organisationController.getAllOrganisations)
  .post(organisationController.createOrganisation);

router
  .route("/:id")
  .get(organisationController.getOrganisation)
  .patch(organisationController.updateOrganisation)
  .delete(organisationController.deleteOrganisation);

module.exports = router;
