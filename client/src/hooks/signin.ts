import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext"


interface signInResponse{
    token: string;
    email: string;
}

interface signInData{
    email: string;
    password: string;
}


const useSignIn = () =>{
    const [apierror, setApiError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const { setAccountEmail } = useUser();

    const signIn = async ( email: string, password: string )=>{ 
        setLoading(true);

        const data: signInData = { email, password};
        try{
            const res = await fetch('http://localhost:5000/api/signin', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Signin failed');
    
            }
            const response: signInResponse = await res.json();
            setAccountEmail(response.email);
            console.log("Account Email:", response.email);
            setToken(response.token);
            router.push('/dashboard');
            } catch (err) {
            setApiError(err instanceof Error ? err.message : 'Error');
            } finally {
            setLoading(false);
            }
    };  
    
    return {signIn, loading, apierror, token};
    
 };

 export default useSignIn;

       
   


