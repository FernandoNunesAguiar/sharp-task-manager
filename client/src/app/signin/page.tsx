"use client"

import { useState } from "react";
import LoadingSpinner from "../../components/loadingSpinner";
import ErrorPanel from "../../components/errorPanel";
import Link from "next/link";
import useSignIn from "../../hooks/signin";

interface SignInFormData {
  email: string;
  password: string;
}


const Signin: React.FC = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const { signIn, loading, apierror } = useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signIn(formData.email, formData.password);
  };


  return (
    <div className='static'>
      {loading && <LoadingSpinner />}
      {apierror && <ErrorPanel onClose={() => {}}>{apierror}</ErrorPanel>}
      <div className='relative md:absolute md:right-15 md:top-25 container md:w-100 rounded-xl md:h-115 flex items-center justify-center overflow-hidden'>
        <form onSubmit={handleSubmit} className='flex items-center justify-center grid grid-row gap-6 place-items-center'>
          <h2 className='text-[50px] flex items-center justify-center'>Sign in</h2>
          <div className='flex items-start grid grid-row gap-4 '>
            <label>Email</label>
            <input type="email" id='email' name="email" onChange={handleChange} className='rounded-[12] w-70 h-8' required />
            <label>Password</label>
            <input type='password' id='password' name="password" onChange={handleChange} className='rounded-[12] w-70 h-8' required />
          </div>
          <button type="submit" className='normalButton rounded-full h-12 w-50'>Sign in</button>
          <Link href="/">Don't have an account? Sign up here</Link>
        </form> 
      </div>
    </div>
  );
}

export default Signin;