"use client"
import Image from "next/image"
import icons from "../../constants/icons"
import { useState, useEffect } from "react"
import Createtask from "@/components/createtask"
import getTasks from "@/lib/getTasks";
import { useUser } from "@/context/userContext"

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const { accountId } = useUser();
    const [loading, setLoading] = useState(false);
    const [ error, setError] = useState('');

    const [openCreateTask, setOpenCreateTask] = useState(false)
    const handleClose = () => {
        setOpenCreateTask(false);
    };
    const handleOpen = () => {
        setOpenCreateTask(true);
    };

    useEffect(() => {
        const fetchTasks = async () =>{
            if (!accountId) {
                setError("Sign in.");
                return;
            }
            setLoading(true);
            setError('');
            try {
                const data = await getTasks(accountId);
                if (!data || data.length === 0) {
                    setError("No tasks found")
                }
                else{
                    setTasks(data.tasks);
                }
            } catch (err) {
                setError("Error fetching tasks");
                console.log("Error fetching tasks");
            } finally {
                setLoading(false);
            }

        };

        fetchTasks();
    }, [accountId]);
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
                    <div>
                        {loading && <p>Loading tasks...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && tasks.length > 0 &&(
                      
                        <div>
                              {tasks.map((task : any)=> (
                        
                        
                                <div key={task.id}>
                                    <ul>
                                        <li>
                                            <div className="flex flex-col w-100 h-100 bg-white rounded-lg shadow-md p-4 m-4">
                                                <h2 className="text-xl font-bold ">{task.task_name}</h2>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
            {openCreateTask && <Createtask handleClose={handleClose}/>}
            </div>

        </div>
    );
}