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
      <div className='nav'>
        {/* Navigation Bar */}
        <nav style={{ padding: '10px', background: 'black', marginBottom: '20px' }}>
          <Link className=''to="/addlogs" style={{ marginRight: '15px' }}>Add Event Log</Link>
          <Link to="/viewlogs">View Event Logs</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/viewlogs" element={<EventLogForm />} /> {/* Add Event Log Page */}
          <Route path="/viewlogs" element={<EventLogList />} /> {/* View Logs Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;