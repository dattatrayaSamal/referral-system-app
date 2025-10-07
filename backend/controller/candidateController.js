const Candidate = require("../models/Candidate");

// Create a new candidate
exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      jobTitle,
      resumeUrl,
    });
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(400).json({ message: "Error creating candidate", error });
  }
};

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates", error });
  }
};

// Update candidate status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ message: "Error updating status", error });
  }
};
