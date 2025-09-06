import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      background: '#2c3e50',
      color: 'white',
      padding: '3rem 2rem 2rem',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>My Company</h3>
          <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
            Delivering excellence since 1990. Your trusted partner for technology, 
            marketing, and consultancy solutions.
          </p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Home</Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>About</Link>
            <Link to="/services" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Services</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Contact</Link>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Connect With Us</h3>
          <p style={{ opacity: 0.8 }}>📧 contact@mycompany.com</p>
          <p style={{ opacity: 0.8 }}>📞 +1 (555) 123-4567</p>
        </div>
      </div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto 0',
        paddingTop: '2rem',
        borderTop: '1px solid #34495e',
        textAlign: 'center',
        opacity: 0.8
      }}>
        <p>&copy; 2025 My Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;