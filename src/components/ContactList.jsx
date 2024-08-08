import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/db';
import Search from './Search';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchContacts() {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      setContacts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const searchContainerStyle = {
    marginBottom: '20px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const listItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginBottom: '10px',
    transition: 'background-color 0.3s',
  };

  const listItemHoverStyle = {
    backgroundColor: '#e0e0e0',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  const addContactLinkStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#28a745',
    borderRadius: '5px',
    textDecoration: 'none',
    marginTop: '20px',
  };

  const addContactLinkHoverStyle = {
    backgroundColor: '#218838',
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <Search setSearchTerm={setSearchTerm} />
      </div>
      <ul style={listStyle}>
        {filteredContacts.map(contact => (
          <li 
            key={contact.id} 
            style={listItemStyle} 
            onMouseOver={e => e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor}
            onMouseOut={e => e.currentTarget.style.backgroundColor = listItemStyle.backgroundColor}
          >
            <Link to={`/contact/${contact.id}`} style={linkStyle}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add" style={addContactLinkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = addContactLinkHoverStyle.backgroundColor}
        onMouseOut={e => e.currentTarget.style.backgroundColor = addContactLinkStyle.backgroundColor}
      >
        Add New Contact
      </Link>
    </div>
  );
}

export default ContactList;
