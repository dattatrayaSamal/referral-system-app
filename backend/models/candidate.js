const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  jobTitle: String,
  status: { type: String, default: "Pending" },
  resumeUrl: String,
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
