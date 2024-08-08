import React from 'react';

function Search({ setSearchTerm }) {
  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
    marginBottom: '20px',
  };

  return (
    <input
      type="text"
      placeholder="Search contacts..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={inputStyle} // Apply the inline styles
    />
  );
}

export default Search;
