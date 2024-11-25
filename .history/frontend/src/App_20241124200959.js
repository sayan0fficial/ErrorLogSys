import { React, useState } from 'react';
import EventLogForm from './components/';
import EventLogList from './components/EventLogList';

const App = () => {
  const [eventLogs, setEventLogs] = useState([]);

  const handleAddEvent = (newEvent) => {
    setEventLogs([newEvent, ...eventLogs]);
  };

  return (
    <div>
      <h1>Event Logging System</h1>
      <EventLogForm onAdd={handleAddEvent} />
      <EventLogList />
    </div>
  );
};

export default App;