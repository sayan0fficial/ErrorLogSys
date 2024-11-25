import axios from 'axios';

const API_URL = 'http://localhost:80/eventlog';

export const addEventLog = async (eventLogData) => {
  try {
    const response = await axios.post(${API_URL}`, eventLogData);
    return response.data; // Assuming the backend sends the created event log as a response
  } catch (error) {
    console.error('Error adding event log:', error);
    throw error; // This can be caught in the calling component to show an error
  }
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
