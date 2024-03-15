// eslint-disable-next-line no-unused-vars
import React from 'react';
import { auth } from '../firebase';

const SignOut = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user')
      window.location.reload(false)
    } catch (error) {
      alert('Error signing out:', error.message);
      
    }
  };

  return (
    <div>
      <button className="rounded bg-slate-600 p-1" onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
