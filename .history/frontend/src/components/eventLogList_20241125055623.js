import React, { useEffect, useState } from 'react';
import { getEventLogs } from '../services/api';
import { Box, Button, TextField, Typography } from '@mui/material';

const EventLogList = () => {
  const [eventLogs, setEventLogs] = useState([]); // Array of logs
  const [filters, setFilters] = useState({
    eventType: '',
    sourceAppId: '',
    startTime: '',
    endTime: '',
  });

  // Fetch Event Logs
  const fetchEventLogs = async () => {
    try {
      const data = await getEventLogs(filters); // Fetch logs using API
      setEventLogs(Array.isArray(data) ? data : []); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching event logs:', error.response?.data || error.message);
      alert('Error fetching logs. Please check the console for details.');
      setEventLogs([]);
    }
  };

  // Fetch logs on filter changes
  useEffect(() => {
    fetchEventLogs();
  }, [filters]);

  const formatTimestamp = (timestamp) => {
    if (timestamp) {
      return new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' });
    }
    return 'No Timestamp';
  };

  const formatPayload = (payload) => {
    if (payload && Object.keys(payload).length > 0) {
      return Object.entries(payload)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }
    return 'Empty Payload';
  };

  return (
    <Box sx={{ padding: 2 }}

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <TextField
          label="Event Type"
          value={filters.eventType}
          onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Source App ID"
          value={filters.sourceAppId}
          onChange={(e) => setFilters({ ...filters, sourceAppId: e.target.value })}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Start Time"
          type="datetime-local"
          value={filters.startTime}
          onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <TextField
          label="End Time"
          type="datetime-local"
          value={filters.endTime}
          onChange={(e) => setFilters({ ...filters, endTime: e.target.value })}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={fetchEventLogs}>
          Search
        </Button>
      </Box>

      {/* Basic Table */}
      <Box sx={{ height: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Event Type</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Source App ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Payload</th>
            </tr>
          </thead>
          <tbody>
            {eventLogs.map((log) => (
              <tr key={log._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.eventType}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {formatTimestamp(log.timestamp)}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{log.sourceAppId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {formatPayload(log.payload)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default EventLogList;
