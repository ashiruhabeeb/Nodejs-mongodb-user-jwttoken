const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [ true, 'Firstname is required' ],
        },
        lastname: {
            type: String,
            required: [ true, 'Lastname is required' ]
        },
        username: {
            type: String,
            required: [ true, 'Username is required' ],
            unique: true
        },
        email: {
            type: String,
            required: [ true, 'Ename is required' ],
            unique: true,
            lowercase: true,
            // validate: [ isEmail, 'Please provide a valid email address']
        },
        password: {
            type: String,
            required: [ true, 'password is required' ],
            minLenght: [ 7, 'Minimum password lenght is 7 characters']
        },
        phone: {
            type: String,
            required: [ true, 'Phone number is required' ],
            unique: true
        },
        address: {
            type: String,
            required: [ true, 'Addess is required' ]
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePasswords = async function (password){
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;