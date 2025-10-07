import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateCard from './CandidateCard';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await axios.get('http://localhost:5000/candidates');
      setCandidates(response.data);
    };
    fetchCandidates();
  }, []);

  const handleStatusChange = async (id, status) => {
    await axios.put(`http://localhost:5000/candidates/${id}/status`, { status });
    setCandidates(candidates.map(candidate => 
      candidate._id === id ? { ...candidate, status } : candidate
    ));
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
    candidate.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by job title or status" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div>
        {filteredCandidates.map(candidate => (
          <CandidateCard 
            key={candidate._id} 
            candidate={candidate} 
            onStatusChange={handleStatusChange} 
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
