const express = require("express");
const router = express.Router();
const { getAllProjects, getProjectById } = require("./projects.controller");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

module.exports = router;