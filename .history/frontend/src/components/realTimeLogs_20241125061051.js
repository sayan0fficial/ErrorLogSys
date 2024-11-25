// src/components/RealTimeLogs.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const RealTimeLogs = () => {
  const [eventLogs, setEventLogs] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:80');  // Make sure to use your server's URL here

    ws.onmessage = (event) => {
      const newLog = JSON.parse(event.data);  // Parse the log data
      setEventLogs((prevLogs) => [newLog, ...prevLogs]);  // Add the new log to the state
    };

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Real-Time Event Logs
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event Type</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Source App ID</TableCell>
            <TableCell>Payload</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventLogs.map((log) => (
            <TableRow key={log._id}>
              <TableCell>{log.eventType}</TableCell>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.sourceAppId}</TableCell>
              <TableCell>{JSON.stringify(log.payload)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default RealTimeLogs;