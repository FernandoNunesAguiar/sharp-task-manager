const setNewTask = async( taskName : string, taskDescription: string, userId: number) => {
        try { const res = await fetch('http://localhost:5000/api/newtask', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskName, taskDescription,  user_Id: userId}),
            })
            if (res.status === 404) {
                return null;
            }
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            const data = await res.json();
            return data;
        } catch(error) {
            console.error(error);
            throw error;
        }

}
export default setNewTask;