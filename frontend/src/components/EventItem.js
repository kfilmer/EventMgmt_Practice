import React from 'react';
import './EventForm.css'; // Reuse the styles from EventForm.css

const EventItem = ({ event, onDelete, onEdit }) => {
  return (
    <div className="event-card">
      <div className="event-info">
        <div className="event-title">{event.title}</div>
        <div className="event-date">
          <strong>Event On:</strong>{' '}
          {new Date(event.date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        {event.description && <p>{event.description}</p>}
      </div>
      <div className="event-actions">
        <button className="delete-btn" onClick={() => onDelete(event._id)}>Delete</button>
        <button onClick={() => onEdit(event)}>Edit</button>
      </div>
    </div>
  );
};

export default EventItem;
