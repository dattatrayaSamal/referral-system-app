import React, { useState, useEffect } from "react";
import { getCandidates, updateCandidateStatus } from "../api";
import ReferralForm from "./ReferralForm";
import Modal from "./Modal";
import { useReferral } from "../context/ReferralContext";

const CandidateDashboard = () => {
  const { isModalOpen, openModal, closeModal, refreshCandidates } =
    useReferral();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [refreshCandidates]);

  const handleStatusUpdate = async (candidateId, newStatus) => {
    try {
      const updatedCandidate = await updateCandidateStatus(
        candidateId,
        newStatus
      );
      setCandidates(
        candidates.map((candidate) =>
          candidate._id === candidateId ? updatedCandidate : candidate
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const jobTitle = candidate?.jobTitle || "";
    const status = candidate?.status || "";
    return (
      jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      status.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Referred Candidates
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by job title or status"
            className="px-4 py-2 border rounded-md w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={openModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Refer Candidate
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ReferralForm />
      </Modal>

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-blue-600">
                {candidate.name}
              </h2>
              <p className="text-lg text-gray-700">{candidate.jobTitle}</p>
              <p
                className={`mt-2 text-sm font-medium ${
                  candidate.status === "Hired"
                    ? "text-green-600"
                    : candidate.status === "Reviewed"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {candidate.status}
              </p>

              {/* resume view */}
              {candidate.resumeUrl && (
                <a
                  href={candidate.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-600 hover:underline"
                >
                  📄 View Resume
                </a>
              )}

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleStatusUpdate(candidate._id, "Reviewed")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Reviewed
                </button>
                <button
                  onClick={() => handleStatusUpdate(candidate._id, "Hired")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Hired
                </button>
                <button
                  onClick={() => handleStatusUpdate(candidate._id, "Pending")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;
