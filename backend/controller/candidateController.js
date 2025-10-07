const Candidate = require("../models/Candidate");

// Delete uploaded file helper
function deleteUploadedFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("❌ Error deleting file:", filePath, err);
    } else {
      console.log("🗑️ Deleted file:", filePath);
    }
  });
}

exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;

    if (!name || !email || !phone || !jobTitle) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Invalid phone number. Must be 10 digits." });
    }

    const resumeUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    console.log(resumeUrl);
    const candidate = new Candidate({
      name,
      email,
      phone,
      jobTitle,
      status: "Pending",
      resumeUrl,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    console.error("Error creating candidate:", error);
    if (req.file) deleteUploadedFile(req.file.path);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates", error });
  }
};

const allowedStatuses = ["Pending", "Reviewed", "Hired"];
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status value. Allowed values are: Pending, Reviewed, Hired.",
      });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating status", error: error.message });
  }
};
