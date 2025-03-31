"use client"
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

function CreateTask({ handleClose }) {
    const router = useRouter();
    const { accountId } = useUser();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const userId = accountId;
  
    console.log("Raw accountId from context:", accountId);
    console.log("Parsed userId:", userId);

    if (userId == 0) {
       router.push('/signin');
    }




    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          setLoading(true);
          setError('');
          const res = await fetch('http://localhost:5000/api/newtask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskName, taskDescription,  user_Id: userId}),
          });
    
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Signup failed');
          }
    
          const data = await res.json();
          console.log(data);
          router.push('/dashboard');
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

    
    return (
        <div className="overlay">
            <div className="taskmodal container rounded-2xl w-100 h-130 items-center justify-center">
                <div className="pt-2 pl-2">
                    <button className="normalButton w-10 h-8 rounded-2xl" onClick={handleClose}>Close</button>
                </div>
                <div className="flex items-center justify-center">
                    <form onSubmit={handleSubmit}  className='flex items-center justify-center grid grid-row gap-6 place-items-center'>
                        <h2 className='text-[50px] flex items-center justify-center'>Set your task</h2>
                        <div className='flex items-start grid grid-row gap-4 '>
                            <label>Task Name</label>
                            <input onChange={(e) => setTaskName(e.target.value)} type="taskname" id='taskname' name="taskname"  className='rounded-[12] w-70 h-8' required />
                            <label>Description</label>
                            <textarea 
                                onChange={(e) => setTaskDescription(e.target.value)}
                                name="description" 
                                id="description" 
                                rows="4" 
                                className="rounded-[12] bg-white"
                                placeholder={`08:00 Comer \n12:00 Ir pra Academia \n16:00 Estudar`}
                                required
                            />
                        </div>
                        <button type="submit" className='normalButton rounded-full h-12 w-50'>Create</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreateTask;