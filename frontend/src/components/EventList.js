import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';
import EventForm from './EventForm';
import './EventForm.css'; // Reusing styles for layout and cards

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data);
  };

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const deleteEvent = async (id) => {
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    setEvents(events.filter((e) => e._id !== id));
  };

  const updateEvent = async (updatedEvent) => {
    const res = await fetch(`/api/events/${updatedEvent._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    });
    const data = await res.json();
    setEvents(events.map((e) => (e._id === data._id ? data : e)));
    setEditing(null);
  };

  const handleEdit = (event) => {
    setEditing(event);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateEvent(editing);
  };

  return (
    <div className="main-container">
      <h1>Event Management App</h1>
      <EventForm onAdd={addEvent} />

      {editing && (
        <form onSubmit={handleEditSubmit} style={{ marginTop: '20px' }}>
          <label>Title:</label>
          <input
            type="text"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            required
          />
          <label>Description:</label>
          <input
            type="text"
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
          />
          <label>Date:</label>
          <input
            type="date"
            value={editing.date.split('T')[0]}
            onChange={(e) => setEditing({ ...editing, date: e.target.value })}
            required
          />
          <button type="submit">Update</button>
        </form>
      )}

      <div className="event-list">
        {events.map((event) => (
          <EventItem
            key={event._id}
            event={event}
            onDelete={deleteEvent}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
