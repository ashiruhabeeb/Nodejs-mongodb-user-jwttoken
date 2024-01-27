const express = require('express');
const cors = require('cors');
const config = require('../config/config');
const connectdb = require('../config/db');
const healthRoute = require('../routes/healthChecker');
const authRoutes = require('../routes/authRoutes');
const protectedRoutes = require('../routes/protectedRoutes');

const app = express();

// call mongodb connection function
connectdb(config.dbURL);

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// initialize routes
app.use( healthRoute );
app.use( authRoutes );
app.use( protectedRoutes );

// Initialize server connection
// const port = process.env.PORT
app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});
