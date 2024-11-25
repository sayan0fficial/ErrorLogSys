import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >import React, { useState } from 'react';
        import EventLogForm from './components/EventLogForm';
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
        
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
