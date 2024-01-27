const mongoose = require('mongoose');

// const connectdb = () => {
//     try {
//         mongoose.connect(dbURL)
//         console.log('Connected to MongoDB')
//     } catch(e) {
//         console.log(e);
//     };
// };

const connectdb = async (dbURL) => {
    try {
        mongoose.connect(dbURL);
        console.log('Connected to MongoDB')
    } catch (err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectdb;
