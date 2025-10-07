const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createCandidate,
  getCandidates,
  updateStatus,
} = require("../controller/candidateController");

const router = express.Router();

// File upload setup (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Store the uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
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

// Routes
router.post("/candidates", upload.single("resume"), createCandidate);
router.get("/candidates", getCandidates);
router.put("/candidates/:id/status", updateStatus);

module.exports = router;
