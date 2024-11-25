import React, { useEffect, useState } from 'react';
import { getEventLogs } from '../services/api';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const EventLogList = () => {
  const [eventLogs, setEventLogs] = useState([]); // Array of logs
  const [filters, setFilters] = useState({
    eventType: '',
    sourceAppId: '',
    startTime: '',
    endTime: '',
  });
  const [page, setPage] = useState(0); // Current page for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Fetch Event Logs from API
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

  // WebSocket connection for real-time logs
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:80');  // Ensure the URL is correct

    ws.onmessage = (event) => {
      const newLog = JSON.parse(event.data);  // Parse the log data
      setEventLogs((prevLogs) => [newLog, ...prevLogs]);  // Add the new log to the beginning of the list
    };

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array to run once on mount

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

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

  // Paginated logs
  const paginatedLogs = eventLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
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
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        Event Logs
      </Typography>

      {/* Table with Pagination */}
      <TableContainer>
        <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell>Event Type</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Source App ID</TableCell>
              <TableCell>Payload</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.eventType}</TableCell>
                <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                <TableCell>{log.sourceAppId}</TableCell>
                <TableCell>{formatPayload(log.payload)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={eventLogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EventLogList;
