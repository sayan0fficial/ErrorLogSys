import React, { useState } from 'react';
import { addEventLog } from '../services/api';

const EventLogForm = ({ onAdd }) => {
  const [eventType, setEventType] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [sourceAppId, setSourceAppId] = useState('');
  const [payload, setPayload] = useState({ userId: '', action: '' }); // Handle payload as an object

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEventLog = {
      eventType,
      timestamp,
      sourceAppId,
      payload, // Directly use payload as an object
    };

    try {
      const addedEvent = await addEventLog(newEventLog);
      onAdd(addedEvent); // Callback to update the parent component state
    } catch (error) {
      alert('Error adding event log');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Type:</label>
        <input
          type="text"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
      </div>
      <div>
        <label>Timestamp:</label>
        <input
          type="datetime-local"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
      </div>
      <div>
        <label>Source App ID:</label>
        <input
          type="text"
          value={sourceAppId}
          onChange={(e) => setSourceAppId(e.target.value)}
        />
      </div>
      <div>
        <label>Payload (userId & action):</label>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={payload.userId}
            onChange={(e) => setPayload({ ...payload, userId: e.target.value })}
          />
        </div>
        <div>
          <label>Action:</label>
          <input
            type="text"
            value={payload.action}
            onChange={(e) => setPayload({ ...payload, action: e.target.value })}
          />
        </div>
      </div>
      <button type="submit">Add Event Log</button>
    </form>
  );
};

export default EventLogForm;