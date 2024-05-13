import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { addUser } from '../../../services/datastore';

const SignUpPanel = () => {
  const history = useHistory();
  const auth = getAuth();

  const handleSuccess = async (response) => {
    const credential = GoogleAuthProvider.credential(response.credential);
    try {
      const result = await signInWithCredential(auth, credential);
      const { user } = result;

      if (result.additionalUserInfo.isNewUser) {
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        };

        await addUser(user.uid, newUser);
        console.log('New user added:', user.displayName);
      }

      console.log('Login Success:', user.displayName);
      history.push('/home');
    } catch (error) {
      console.error('Firebase auth error:', error);
    }
  };

  const handleError = (error) => {
    console.error('Login Error:', error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </div>
  );
};

export default SignUpPanel;
