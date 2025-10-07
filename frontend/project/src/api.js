import axios from "axios";

const API_URL = "http://localhost:5000";

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
  }
};
