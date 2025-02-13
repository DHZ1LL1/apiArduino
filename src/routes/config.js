const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");

router.get("/config", configController.getConfig);
router.put("/config", configController.updateConfig);

module.exports = router;
