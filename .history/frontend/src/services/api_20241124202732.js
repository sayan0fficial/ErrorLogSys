import axios from 'axios';

const API_URL = 'http://localhost:3000/eventlog'; // Update this with your actual backend URL

// API call to add a new event log
export const addEventLog = async (eventData) => {
  try {
    const response = await axios.post(`${AP/add`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error adding event log:', error);
    throw error;
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
