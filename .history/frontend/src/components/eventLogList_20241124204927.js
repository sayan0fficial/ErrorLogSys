import React, { useEffect, useState } from 'react';
import { getEventLogs } from '../services/api';

const EventLogList = () => {
  const [eventLogs, setEventLogs] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedSourceAppId, setSelectedSourceAppId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [filters, setFilters] = useState({
    eventType: '',
    sourceAppId: '',
    startTime: '',
    endTime: '',
  });

  const fetchEventLogs = async () => {
    try {
      const response = await getEventLogs(filters);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // This is where parsing happens
      setEventLogs({
        logs: Array.isArray(data.logs) ? data.logs : [],
        totalCount: data.totalCount || 0,
      });
    } catch (error) {
      console.error('Error fetching event logs:', error);
      setEventLogs({ logs: [], totalCount: 0 });
    }
  };

  useEffect(() => {
    fetchEventLogs();
  }, [filters]);

  useEffect(() => {
    console.log(eventLogs); // Debug log to check the structure
  }, [eventLogs]);

  return (
    <div>
      <h2>Event Logs</h2>
      <div>
        <label>Event Type:</label>
        <input
          type="text"
          value={filters.eventType}
          onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
        />
        <label>Source App ID:</label>
        <input
          type="text"
          value={filters.sourceAppId}
          onChange={(e) => setFilters({ ...filters, sourceAppId: e.target.value })}
        />
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={filters.startTime}
          onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
        />
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={filters.endTime}
          onChange={(e) => setFilters({ ...filters, endTime: e.target.value })}
        />
        <button onClick={fetchEventLogs}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Timestamp</th>
            <th>Source App ID</th>
            <th>Payload</th>
          </tr>
        </thead>
        <tbody>
          {eventLogs.logs.map((log, index) => (
            <tr key={index}>
              <td>{log.eventType}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.sourceAppId}</td>
              <td>{JSON.stringify(log.payload)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventLogList;