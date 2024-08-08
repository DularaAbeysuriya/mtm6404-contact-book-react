import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the updated ReactDOM
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
