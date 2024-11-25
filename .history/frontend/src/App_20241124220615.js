import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Use for routing links
import EventLogForm from './components/eventLogForm';
import EventLogList from './components/eventLogList';

const App = () => {
  const [eventLogs, setEventLogs] = useState([]);

  const handleAddEvent = (newEvent) => {
    setEventLogs([newEvent, ...eventLogs]);
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar using MUI */}
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Event Logging System
            </Typography>
            <Button color="success" component={RouterLink} to="/addlogs">
              <b>Add Event Log</b>
            </Button>
            <Button color="secondary" font-weight='700' component={RouterLink} to="/viewlogs">
              View Event Logs
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route
              path="/addlogs"
              element={<EventLogForm onAdd={(newEvent) => handleAddEvent(newEvent)} />}
            />
            <Route path="/viewlogs" element={<EventLogList eventLogs={eventLogs} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
