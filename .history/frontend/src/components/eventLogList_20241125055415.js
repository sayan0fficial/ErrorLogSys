import React, { useEffect, useState } from 'react';
import { getEventLogs } from '../services/api';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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
        return timestamp ? new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }) : ;
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

      {/* DataGrid Table */}
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={eventLogs.map((log) => ({
            id: log._id,
            ...log,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row._id}
        />

      </Box>
    </Box>
  );
};

export default EventLogList;
