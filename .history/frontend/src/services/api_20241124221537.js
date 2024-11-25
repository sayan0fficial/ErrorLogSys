import axios from 'axios';

const API_URL = 'http://localhost:80/eventlog';

export const addEventLog = async (eventLogData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, eventLogData);
};

// API call to fetch event logs
export const getEventLogs = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/fetch`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching event logs:', error);
    throw error;
  }
};
