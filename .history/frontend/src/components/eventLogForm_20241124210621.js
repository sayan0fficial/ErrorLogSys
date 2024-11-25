import React, { useState } from 'react';
import { addEventLog } from '../services/api';
import { TextField, Button, Container, Grid2, Typography } from '@mui/material';

const EventLogForm = ({ onAdd }) => {
  const [eventType, setEventType] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [sourceAppId, setSourceAppId] = useState('');
  const [payload, setPayload] = useState({ userId: '', action: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEventLog = {
      eventType,
      timestamp,
      sourceAppId,
      payload,
    };

    try {
      const addedEvent = await addEventLog(newEventLog);
      onAdd(addedEvent); // Callback to update the parent component state
    } catch (error) {
      alert('Error adding event log');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Add Event Log
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Event Type"
              variant="outlined"
              fullWidth
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Timestamp"
              type="datetime-local"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Source App ID"
              variant="outlined"
              fullWidth
              value={sourceAppId}
              onChange={(e) => setSourceAppId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Payload</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              value={payload.userId}
              onChange={(e) => setPayload({ ...payload, userId: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Action"
              variant="outlined"
              fullWidth
              value={payload.action}
              onChange={(e) => setPayload({ ...payload, action: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Add Event Log
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EventLogForm;