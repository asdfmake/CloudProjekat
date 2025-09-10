import { createUser, createTask, getAllUsers, getAllTasks, deleteTask } from './databaseFunctions.js';

export const createUserApi = (req, res) => {
    const { name, email } = req.body;
    createUser(name, email).then(userId => {
        res.status(200).json({ id: userId, name, email });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
}

export const createTaskApi = (req, res) => {
    const { userId, title, description } = req.body;
    createTask(userId, title, description).then(taskId => {
        res.status(200).json({ id: taskId, userId, title, description });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
}

export const getUsersApi = (req, res) => {
    getAllUsers().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
}

export const getTasksApi = (req, res) => {
    getAllTasks().then(tasks => {
        res.status(200).json(tasks);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
}

export const deleteTaskApi = (req, res) => {
    const { id } = req.params;
    deleteTask(id).then(() => {
        res.status(200).json({ message: 'Task obrisan' });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
}