const protectedRoutes = require('express').Router();
const { verifyToken } = require('../middleware/jwt');
const userController = require('../controllers/protectedControllers');

protectedRoutes.use(verifyToken)
protectedRoutes.get('/api/users', userController.getUsers);
protectedRoutes.get('/api/users/:id', userController.getUserById);
protectedRoutes.patch('/api/users/:id', userController.updateUser);
protectedRoutes.delete('/api/users/:id', userController.deleteUser);
protectedRoutes.post('/api/users/:id', userController.logout);

module.exports = protectedRoutes;
