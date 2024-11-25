// src/components/EventLogList.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getEventLogs } from '../services/api';
import RealTimeLogs from './RealTimeLogs';  // Import RealTimeLogs component

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

  const columns = [
    { field: 'eventType', headerName: 'Event Type', flex: 1 },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      flex: 1,
      valueGetter: (params) => {
        const timestamp = params.row?.timestamp;
        return timestamp ? new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }) : 'No Timestamp';
      },
    },
    { field: 'sourceAppId', headerName: 'Source App ID', flex: 1 },
    {
      field: 'payload',
      headerName: 'Payload',
      flex: 2,
      valueGetter: (params) => {
        const payload = params.row?.payload;
        if (payload && Object.keys(payload).length > 0) {
          // Format the payload object into a readable string (key: value)
          return Object.entries(payload)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        }
      },
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Event Logs
      </Typography>

      {/* Filters and Event Logs Table */}
      {/* Add your existing filter section and event logs table here */}
      <RealTimeLogs />  {/* Add RealTimeLogs component to display real-time updates */}

    </Box>
  );
};

export default EventLogList;
