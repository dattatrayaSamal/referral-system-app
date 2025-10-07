import React, { useState } from 'react';
import axios from 'axios';

const ReferralForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('jobTitle', jobTitle);
    if (resume) formData.append('resume', resume);

    try {
      await axios.post('http://localhost:5000/candidates', formData);
      alert('Candidate referred successfully!');
    } catch (error) {
      console.error(error);
      alert('Error referring candidate!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
      <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReferralForm;
