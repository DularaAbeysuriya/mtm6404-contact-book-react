import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/db';

function ContactForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (id) {
      async function fetchContact() {
        const docRef = doc(db, 'contacts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const contact = docSnap.data();
          setFirstName(contact.firstName);
          setLastName(contact.lastName);
          setEmail(contact.email);
        }
      }
      fetchContact();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateDoc(doc(db, 'contacts', id), { firstName, lastName, email });
    } else {
      await addDoc(collection(db, 'contacts'), { firstName, lastName, email });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{id ? 'Update' : 'Add'} Contact</button>
    </form>
  );
}

export default ContactForm;
