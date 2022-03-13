import { Router } from "express";
import { Register, Login, getUser, Logout, updateUser, updatePassword } from "./controller/auth";
import { createPost, deletePost, getPost, getPosts, updatePost } from "./controller/post";
import { createComment, deleteComment } from "./controller/comment";
import { authMiddleware } from "./middlewares/authMiddleware";
import { isPostOwner } from "./middlewares/guardsMiddleware";

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.post('/api/logout', authMiddleware, Logout);
    router.get('/api/user', authMiddleware, getUser);
    router.put('/api/users/info', authMiddleware, updateUser)
    router.put('/api/users/password', authMiddleware, updatePassword)

    router.get('/api/posts', authMiddleware, getPosts);
    router.get('/api/posts/:id', authMiddleware, getPost)
    router.post('/api/posts', authMiddleware, createPost)
    router.put('/api/posts/:id', authMiddleware,isPostOwner, updatePost)
    router.delete('/api/posts/:id', authMiddleware,isPostOwner, deletePost)

    router.post('/api/posts/:id/comments', authMiddleware, createComment)
    router.delete('/api/posts/:id/comments/:commentId', authMiddleware, deleteComment)
}