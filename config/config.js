const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbURL: process.env.MONGO_URI,
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
};
