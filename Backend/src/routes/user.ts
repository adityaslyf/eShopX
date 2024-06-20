import express from 'express';
import { newUser , getAllUsers , getUser, deleteUser } from '../controllers/user.js';

const app = express.Router();

// route - /api/v1/user/new
app.post('/new' , newUser)

// route - /api/v1/user/all
app.get("/all" , getAllUsers)

//route - api/v1/user/dynamic id
app.get("/:id" , getUser)
app.delete("/:id" , deleteUser)

export default app;