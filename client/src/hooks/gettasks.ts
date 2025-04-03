import { useState } from "react";
import { useUser } from "@/context/userContext";

const getTasks = async (userId: string) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const { accountId } = useUser();
    
    const fetchTasks = async () => {
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
        return data;
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
    }
}

export default getTasks;