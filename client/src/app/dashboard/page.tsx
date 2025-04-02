"use client"
import Image from "next/image"
import icons from "../../constants/icons"
import { useState } from "react"
import Createtask from "@/components/createtask"
import { useUser } from "@/context/userContext"


export default function Dashboard() {
    const [ isLoading, setIsLoading ] = useState(false);
    const { accountId } = useUser();
    
    const getTasks = async () => {
    setIsLoading(true);
    try{
        const res = await fetch(`http://localhost:5000/api/tasks/${accountId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
    }

    const [openCreateTask, setOpenCreateTask] = useState(false)
    const handleClose = () => {
        setOpenCreateTask(false);
    };
    const handleOpen = () => {
        setOpenCreateTask(true);
    };

    return(

        
        <div >
            <div className="static  md:absolute md:right-15 md:top-25 container w-100 h-100 rounded-lg">
                <div className="relative flex items-start" >
                    <button onClick={handleOpen} className="flex normalButton rounded-lg w-45 h-25 items-center justify-center mt-6 ml-6"> 
                        <Image
                            alt='+'
                            src={icons.plus}
                            width={70}
                            height={70}
                        />
                    </button>

                </div>
            </div>
            <div>
            {openCreateTask && <Createtask handleClose={handleClose}/>}
            </div>

        </div>
    )
}