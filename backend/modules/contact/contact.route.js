const express = require("express");
const router = express.Router();
const { sendContact } = require("./contact.controller");

router.post("/", sendContact);

module.exports = router;