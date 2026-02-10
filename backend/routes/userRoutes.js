import express from 'express';
import { createUser, getUsers, getUser, updateUser ,deleteUser} from '../controllers/userController.js';
const route = express.Router();

route.post("/user", createUser);
route.get("/users", getUsers);
route.get("/users/:id", getUser);
route.patch("/users/:id", updateUser);
route.delete("/users/:id", deleteUser);

export default route;