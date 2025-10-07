const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createCandidate,
  getCandidates,
  updateStatus,
} = require("../controller/candidateController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }
    cb(null, true);
  },
});

router.post("/candidates", upload.single("resume"), createCandidate);
router.get("/candidates", getCandidates);
router.put("/candidates/:id/status", updateStatus);

module.exports = router;
