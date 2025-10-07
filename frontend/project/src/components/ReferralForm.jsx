import React, { useState } from "react";
import { referCandidate } from "../api";
import { useReferral } from "../context/ReferralContext";

const ReferralForm = () => {
  const { closeModal, triggerRefresh } = useReferral();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("jobTitle", formData.jobTitle);
    if (formData.resume) {
      formDataToSubmit.append("resume", formData.resume);
    }

    try {
      await referCandidate(formDataToSubmit);
      alert("Candidate referred successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        resume: null,
      });

      closeModal();
      triggerRefresh();
    } catch (error) {
      const backendError = error?.response?.data?.message;
      setError(backendError || "Error referring candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Refer a Candidate
      </h2>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Candidate Name"
          className="px-4 py-2 border rounded-md w-full mb-4"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="px-4 py-2 border rounded-md w-full mb-4"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="px-4 py-2 border rounded-md w-full mb-4"
          required
        />
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="px-4 py-2 border rounded-md w-full mb-4"
          required
        />
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          className="px-4 py-2 border rounded-md w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Referral"}
        </button>
      </form>
    </div>
  );
};

export default ReferralForm;
