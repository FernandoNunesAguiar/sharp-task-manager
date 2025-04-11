"use client"
import { useState, FormEvent, useTransition, useActionState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import setNewTask from "@/lib/setNewTask";

function CreateTask({ taskName, setTaskName, taskDescription, setTaskDescription, handleClose }) {
    const router = useRouter();
    const { accountId } = useUser();
    const userId = accountId;
  
    console.log("Raw accountId from context:", accountId);
    console.log("Parsed userId:", userId);

    if (userId == 0) {
       router.push('/signin');
    }
    const [error, submitAction, isPending] = useActionState(
      async (previousState, formData) =>{
        const error = await setNewTask(formData.get('taskname'), formData.get('description'), userId);
        if (error) {
          return error;
        }
        redirect('/dashboard');
        return null;
      },
      null,
    );

      

    
    return (
        <div className="overlay">
            <div className="taskmodal container rounded-2xl w-100 h-130 items-center justify-center">
                <div className="pt-2 pl-2">
                    <button className="normalButton w-10 h-8 rounded-2xl" onClick={handleClose}>Close</button>
                </div>
                <div className="flex items-center justify-center">
                    <form action={submitAction} className='flex items-center justify-center grid grid-row gap-6 place-items-center'>
                        <h2 className='text-[50px] flex items-center justify-center'>Set your task</h2>
                        <div className='flex items-start grid grid-row gap-4 '>
                            <label>Task Name</label>
                            <input type="taskname" id='taskname' name="taskname"  className='rounded-[12] w-70 h-8' required />
                            <label>Description</label>
                            <textarea 
                                name="description" 
                                id="description" 
                                rows="4" 
                                className="rounded-[12] bg-white"
                                placeholder={`08:00 Comer \n12:00 Ir pra Academia \n16:00 Estudar`}
                                required
                            />
                        </div>
                        <button type="submit" disabled={isPending} className='normalButton rounded-full h-12 w-50'>Create</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreateTask;