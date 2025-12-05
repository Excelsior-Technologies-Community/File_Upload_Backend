const express = require("express");
const router = express.Router();

const uploadMiddleware = require("../Middleware/multerMiddleware");
const { uploadFile, listFiles } = require("../controllers/uploadController");

router.post("/upload", uploadMiddleware, uploadFile);
router.get("/list", listFiles);

module.exports = router;
