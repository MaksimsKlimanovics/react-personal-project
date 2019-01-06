import { MAIN_URL, TOKEN } from './config';

export default new class Api {
    fetchTasks = async () => {
        const response = await fetch (MAIN_URL, {
            method: 'GET'
        });

        const { data: tasks } = await response.json();

        this.setState({
            tasks,
            isTaskFetching: false,
        });
    }

    createTask = async (newTask) => {
        const response = await fetch (MAIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ newTask }),

        });

        const { data: task } = await response.json();

        this.setState(({ tasks }) => ({
            tasks: [ task, ...tasks ],
            isTaskFetching: false,
        }));
    }

    deleteTask = async (id) => {
        await fetch (`${MAIN_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ tasks }) => ({
            tasks:          tasks.filter((task) => task.id !== id),
            isTaskFetching: false,
        }));
    }
};
