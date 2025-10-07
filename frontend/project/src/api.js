import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getCandidates = async () => {
  try {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
  }
};

export const referCandidate = async (candidateData) => {
  try {
    await axios.post(`${API_URL}/candidates`, candidateData);
  } catch (error) {
    console.error("Error referring candidate:", error);
    throw error;
  }
};

export const updateCandidateStatus = async (candidateId, newStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}/candidates/${candidateId}/status`,
      {
        status: newStatus,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating candidate status:", error);
    throw error;
  }
};
