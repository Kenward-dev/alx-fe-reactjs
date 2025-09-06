import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          My Company
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}>
            Home
          </Link>
          <Link to="/about" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}>
            About
          </Link>
          <Link to="/services" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}>
            Services
          </Link>
          <Link to="/contact" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            transition: 'color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = 'white'}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;