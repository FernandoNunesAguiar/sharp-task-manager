"use client"
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Signup failed');
      }

      const data = await res.json();
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='static'>
      <div className='md:absolute md:right-15 md:top-25 container md:w-100 rounded-xl md:h-100 flex items-center justify-center overflow-hidden'>
        <form onSubmit={handleSubmit} className='flex items-center justify-center grid grid-row gap-6 place-items-center'>
          <h2 className='text-[50px] flex items-center justify-center'>Sign up</h2>
          <div className='flex items-start grid grid-row gap-4 '>
            <label>Email</label>
            <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} className='rounded-[14] w-70 h-8' required />
            <label>Password</label>
            <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} className='rounded-[14] w-70 h-8' required />
          </div>
          <button type="submit" className='rounded-2xl h-12 w-50'>Sign up</button>
          {error && <p className='text-red-500'>{error}</p>}
        </form>
      </div>
    </div>
  );
}

