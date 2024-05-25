import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GoogleLogin } from '@react-oauth/google';
import { useHistory } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { updateUserData } from '../../../services/datastore';

const SignUpPanel = () => {
  const history = useHistory();
  const auth = getAuth();

  const handleSuccess = async (response) => {
    const credential = GoogleAuthProvider.credential(response.credential);
    console.log(response);
    try {
      const result = await signInWithCredential(auth, credential);
      console.log(result);

      if (result.user.uid) {
        const newUser = {
          id: result.user.uid,
          name: result.user.displayName,
          year: '',
          major: '',
          minor: '',
          bio: '',
          planid: '',
        };

        await updateUserData(result.user.uid, newUser);
        console.log('New user added:', result.displayName);
      }

      console.log('Login Success:', result.displayName);
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
