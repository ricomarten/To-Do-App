// eslint-disable-next-line no-unused-vars
import React from 'react';
import { auth } from '../firebase';

const SignOut = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
      sessionStorage.removeItem('user')
      window.location.reload(false)
    } catch (error) {
      alert('Error signing out:', error.message);
      
    }
  };

  return (
    <div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
