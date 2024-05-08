import React from 'react';
import { GoogleLogin } from 'react-oauth/google';
import { useNavigate } from 'react-router-dom';

const SignUpPanel = () => {
  const navigate = useNavigate();
  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    navigate('/home');
  };

  const handleError = (error) => {
    console.error('Login Error:', error);
  };

  return (
    <div>
      {/* Your existing signup form */}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default SignUpPanel;
