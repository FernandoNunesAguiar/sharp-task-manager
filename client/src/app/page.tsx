"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "../../components/loadingSpinner";
import ErrorPanel from "../../components/errorPanel";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Signup failed');

      }

      const data = await res.json();
      console.log(data);
      router.push('/signin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseErrorPanel = () => {
    setError('');
  };

  return (
    <div className='static'>
      {loading && <LoadingSpinner />}
      {error && <ErrorPanel onClose={handleCloseErrorPanel}>{error}</ErrorPanel>}
      <div className='relative md:absolute md:right-15 md:top-25 container md:w-100 rounded-xl md:h-100 flex items-center justify-center overflow-hidden'>
        <form onSubmit={handleSubmit} className='flex items-center justify-center grid grid-row gap-6 place-items-center'>
          <h2 className='text-[50px] flex items-center justify-center'>Sign up</h2>
          <div className='flex items-start grid grid-row gap-4 '>
            <label>Email</label>
            <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} className='rounded-[12] w-70 h-8' required />
            <label>Password</label>
            <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} className='rounded-[12] w-70 h-8' required />
          </div>
          <button type="submit" className='normalButton rounded-full h-12 w-50'>Sign up</button>
        </form>
      </div>
      </div>
  );
}

