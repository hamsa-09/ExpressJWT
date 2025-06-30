const express = require('express');
const routes = express.Router();
const verifyjwt = require('./middleware');
const {
    register,
    userLogin,
    getUser,
    getByUserId,
    updateUser,
    deleteByUserId,
    dummy
} = require('./Controller');

// Public Routes
routes.post('/user', register);
routes.post('/login', userLogin);

// Protected Routes
routes.get('/user', verifyjwt, getUser);
routes.get('/user/:_id', verifyjwt, getByUserId);
routes.put('/user/:_id', verifyjwt, updateUser);
routes.delete('/user/:_id', verifyjwt, deleteByUserId);

routes.get('/getdata',dummy)

module.exports = routes;
