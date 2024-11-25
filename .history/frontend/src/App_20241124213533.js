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
    <div>
      <h1>Event Logging System</h1>
      <EventLogForm onAdd={handleAddEvent} />
      {/* <EventLogList /> */}
    </div>
  );
};

export default App;