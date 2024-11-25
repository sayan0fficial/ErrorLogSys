import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Use for routing links
import EventLogForm from './components/eventLogForm';
import EventLogList from './components/eventLogList';

const App = () => {
  const [eventLogs, setEventLogs] = useState([]);

  // Function to add a new event log
  const handleAddEvent = (newEvent) => {
    setEventLogs([newEvent, ...eventLogs]);
  };

  // WebSocket connection for real-time updates
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:80'); // Make sure to use the correct URL

    ws.onmessage = (event) => {
      const newLog = JSON.parse(event.data); // Parse the log data
      setEventLogs((prevLogs) => [newLog, ...prevLogs]); // Add the new log to the state
    };

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Clean up WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <Router>
      <div>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              Event Logging System
            </Typography>
            <Button color="success" component={RouterLink} to="/addlogs">
              <b>Add Event Log</b>
            </Button>
            <Button color="secondary" component={RouterLink} to="/viewlogs">
              <b>View Event Logs</b>
            </Button>
          </Toolbar>
        </AppBar>

        {/* main content */}
        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route
              path="/addlogs"
              element={<EventLogForm onAdd={handleAddEvent} />}
            />
            <Route
              path="/viewlogs"
              element={<EventLogList eventLogs={eventLogs} />}
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
