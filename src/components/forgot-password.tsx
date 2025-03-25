import React, { useState } from 'react';
import axios from 'axios';

interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost/maggiebeautyhome-backend/forgot-password.php', { email })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('An error occurred.');
        console.error('Forgot password error:', error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Send Reset Link</button>
        </form>
        {message && <p className="mt-4">{message}</p>}
        <button onClick={onClose} className="mt-4 w-full p-2 bg-gray-500 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;