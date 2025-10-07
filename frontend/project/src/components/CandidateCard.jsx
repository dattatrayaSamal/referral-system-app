import React from 'react';

const CandidateCard = ({ candidate, onStatusChange }) => {
  return (
    <div className="candidate-card">
      <h3>{candidate.name}</h3>
      <p>Job Title: {candidate.jobTitle}</p>
      <p>Status: {candidate.status}</p>
      <select
        value={candidate.status}
        onChange={(e) => onStatusChange(candidate._id, e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Hired">Hired</option>
      </select>
    </div>
  );
};

export default CandidateCard;
