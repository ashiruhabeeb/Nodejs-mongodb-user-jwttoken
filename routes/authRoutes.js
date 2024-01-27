const authRoutes = require('express').Router();
const authController = require('../controllers/authControllers');

authRoutes.post('/api/users/register', authController.createUser);
authRoutes.post('/api/users/login', authController.login);

module.exports = authRoutes;
