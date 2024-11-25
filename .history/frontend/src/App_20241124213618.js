import { React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      {/* Navigation Bar */}
      <nav style={{ padding: '10px', background: '#f4f4f4', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Add Event Log</Link>
        <Link to="/logs">View Event Logs</Link>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<EventLogForm />} /> {/* Add Event Log Page */}
        <Route path="/logs" element={<EventLogList />} /> {/* View Logs Page */}
      </Routes>
    </div>
  </Router>
  );
};

export default App;