import { Router } from "express";
import { Register, Login, getUser, Logout, updateUser, updatePassword } from "./controller/auth";
import { authMiddleware } from "./middlewares/authMiddleware";

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', authMiddleware, Logout);
    router.get('/api/user', authMiddleware, getUser);
    router.put('/api/users/info', authMiddleware, updateUser)
    router.put('/api/users/password', authMiddleware, updatePassword)
}