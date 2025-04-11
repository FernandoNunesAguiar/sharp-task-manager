"use client"

import { startTransition, useState, useTransition } from "react";
import LoadingSpinner from "../../components/loadingSpinner";
import ErrorPanel from "../../components/errorPanel";
import Link from "next/link";
import useSignIn from "../../hooks/signin";





const Signin  = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const { signIn, loading, apierror } = useSignIn();
  const handleSubmit =() => {
    startTransition(async () => {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
      setEmail(email);
      setPassword(password);
    })
  };


  return (
    <div className='static'>
      {isPending && <LoadingSpinner />}
      {apierror && <ErrorPanel onClose={() => {}}>{apierror}</ErrorPanel>}
      <div className='relative md:absolute md:right-15 md:top-25 container md:w-100 rounded-xl md:h-115 flex items-center justify-center overflow-hidden'>
          <div className="flex items-center justify-center grid grid-row gap-6 place-items-center">
            <h2 className='text-[50px] flex items-center justify-center'>Sign in</h2>
            <div className='flex items-start grid grid-row gap-4 '>
              <label>Email</label>
              <input type="email" id='email' name="email" onChange={(event) => setEmail(event.target.value)} className='rounded-[12] w-70 h-8' required />
              <label>Password</label>
              <input type='password' id='password' name="password" onChange={(event) => setPassword(event.target.value)} className='rounded-[12] w-70 h-8' required />
            </div>
            <button onClick={handleSubmit} disabled={isPending}  className='normalButton rounded-full h-12 w-50'>Sign in</button>
            {error && <ErrorPanel onClose={() => setError(error)}>{error}</ErrorPanel>}
            <Link href="/">Don't have an account? Sign up here</Link>
          </div>
      </div>
    </div>
  );
}

export default Signin;