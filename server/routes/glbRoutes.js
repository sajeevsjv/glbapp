const express = require('express');
const router = express.Router();
const glbController = require('../controllers/glbController');
const fileUpload = require('../utils/fileUpload').fileUpload;


router.post("/upload",fileUpload.single("file"),glbController.uploadGlb);
router.get("/getall", glbController.getGlb);

module.exports = router;