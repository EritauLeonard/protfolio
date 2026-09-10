const express = require("express");
const router = express.Router();
const { getAllSkills } = require("./skills.controller");

router.get("/", getAllSkills);

module.exports = router;