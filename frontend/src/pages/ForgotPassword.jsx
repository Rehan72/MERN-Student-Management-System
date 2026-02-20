import React from 'react';
import { Link } from 'react-router-dom';
import GlassButton from '../components/common/GlassButton';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Forgot Password</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Feature coming soon.</p>
        <Link to="/login">
            <GlassButton className="w-full bg-blue-600 hover:bg-blue-700">Back to Login</GlassButton>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
