import express from 'express';
import { newUser , getAllUsers , getUser, deleteUser } from '../controllers/user.js';
import { isAdmin } from '../middleware/auth.js';

const app = express.Router();

// route - /api/v1/user/new
app.post('/new' , newUser)

// route - /api/v1/user/all
app.get("/all" , isAdmin , getAllUsers)

//route - api/v1/user/dynamic id
app.route("/:id").get(getUser).delete(deleteUser) // this is the same as the above two lines

export default app; 