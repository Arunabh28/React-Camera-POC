import React from 'react';
import { Link } from 'react-router-dom';

function Card({ to, title }) {
  return (
    <div style={{ margin: '10px', padding: '20px', border: '1px solid black', borderRadius: '5px', width: '200px' }}>
      <Link to={to} style={{ textDecoration: 'none', color: 'black' }}>
        <h3>{title}</h3>
      </Link>
    </div>
  );
}

export default Card;