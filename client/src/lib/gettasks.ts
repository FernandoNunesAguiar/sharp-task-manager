const getTasks = async (accountId: number) => {

    try{
        const res = await fetch(`http://localhost:5000/api/tasks/${accountId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (res.status === 404) {
            return null;
        }
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getTasks;