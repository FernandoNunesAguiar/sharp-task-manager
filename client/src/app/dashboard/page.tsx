"use client"
import Image from "next/image"
import icons from "../../constants/icons"
import { useState } from "react"
import Createtask from "@/components/createtask"


export default function Dashboard() {
    
 

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