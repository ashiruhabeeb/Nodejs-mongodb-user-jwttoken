const express = require('express');

const healthRoute = express.Router();

healthRoute.get('/api/health', (req, res) => {
    res.status(200).json({ 
        msg: 'API is running OK',
        path: req.path,
    });
});

healthRoute.get('/home', (req, res) => {
    res.status(200).json({ 
        msg: 'Welcome Aboard!',
    });
});

module.exports = healthRoute;
