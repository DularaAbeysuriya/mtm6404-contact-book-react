import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/db';

function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      }
    }
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'contacts', id));
    navigate('/');
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const headerStyle = {
    fontSize: '2em',
    marginBottom: '10px',
    color: '#333',
  };

  const detailsStyle = {
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    color: '#555',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  };

  const linkStyle = {
    padding: '10px 20px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#c82333',
  };

  return contact ? (
    <div style={containerStyle}>
      <h1 style={headerStyle}>{contact.firstName} {contact.lastName}</h1>
      <div style={detailsStyle}>
        <p style={paragraphStyle}>Email: {contact.email}</p>
      </div>
      <div style={buttonGroupStyle}>
        <Link to={`/edit/${id}`} style={linkStyle}>Edit</Link>
        <button 
          style={buttonStyle} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleDelete}
        >
          Delete
        </button>
        <Link to="/" style={linkStyle}>Back to List</Link>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ContactDetail;
