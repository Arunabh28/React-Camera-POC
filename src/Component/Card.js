import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ to, title }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // Navigate to the specified 'to' route
  };

  return (
    <div
      style={{
        margin: '10px',
        padding: '20px',
        border: '1px solid black',
        borderRadius: '5px',
        maxWidth: '40%',
        cursor: 'pointer', // Change cursor to indicate it's clickable
      }}
      onClick={handleClick} // Handle click event on the whole card
    >
      <h3>{title}</h3>
    </div>
  );
}

export default Card;
