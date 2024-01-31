import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/bookings.css'; // Ensure the path is correct

function AllBookings() {
  const navigate = useNavigate();
  const bookings = JSON.parse(sessionStorage.getItem('allBookings')) || [];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Bookings</h1>
      {bookings.length > 0 ? (
        <div className="list-group">
          {bookings.map((booking, index) => (
            <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{booking.showName}</h5>
              </div>
              <p className="mb-1">{booking.name}</p>
              <small>{booking.email}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings have been made yet.</p>
      )}
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Back to Show List</button>
    </div>
  );
}

export default AllBookings;
