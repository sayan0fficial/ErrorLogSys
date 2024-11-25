import axios from 'axios';

const API_URL = 'http://localhost:80/eventlog';

// API call to add a new event log
export const addEventLog = async (eventLogData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, eventLogData);
    return response.data; // Assuming the backend sends the created event log as a response
  } catch (error) {
    console.error('Error adding event log:', error);
    throw error; // This can be caught in the calling component to show an error
  }
};

export const getEventLogs = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/fetch`, { params: filters });
    return response.data; // Assuming the backend sends data as response
  } catch (error) {
    console.error('Error fetching event logs:', error.message || error.response);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
