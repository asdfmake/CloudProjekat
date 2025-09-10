import express from 'express';
import path from 'path';
import { createUserApi, createTaskApi, getUsersApi, getTasksApi, deleteTaskApi } from './controller.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', getUsersApi);
app.get('/tasks', getTasksApi);  

app.post('/createUser', createUserApi);
app.post('/createTask', createTaskApi);

app.delete('/deleteTask/:id', deleteTaskApi);

app.use(express.static(path.join(process.cwd(), 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});