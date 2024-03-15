/* eslint-disable no-unused-vars */
// Signup.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      console.log('User signed up successfully!');
      alert('User signed up successfully!')
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up:'+ error.message)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl  text-slate-900 font-bold mb-4">Sign Up</h2>
      <label className="block mb-2  text-slate-900 text-sm font-semibold">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full text-slate-900 p-2 border rounded-md mb-4"
      />
      <label className="block mb-2 text-sm text-slate-900 font-semibold">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full  text-slate-900 p-2 border rounded-md mb-4"
      />
      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;