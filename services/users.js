const User = require('../models/user');

// create a new user
const createUser = async ({firstname,lastname, username, email, password, phone, address}) => {
    try {
        const user = new User({ firstname,lastname, username, email, password, phone, address });
        await user.save();
        return user;

    } catch (err){
        throw Error(err.message);
    }
};

// get all users
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;

    } catch (err){
        throw new Error('Get users internal server error');
    }
};

// get a user by id
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
       
        if (!user){
            throw Error('user not found');
        }
        return user;

    } catch (err){
        throw Error( `user ${id} not found.` );
    };
};

// update / edit user details
const editUser = async ( id, firstname, lastname, username, email, phone, address ) => {
   try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found.')
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.email = email;
        user.phone = phone;
        user.address = address;

        await user.save();
        return user;
   } catch (err) {
        throw new Error('Internal server error')
   }
};

// delete a user record
const deleteUser = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);

        if (!user){
            throw Error( `user ${id} not found.` );
        };
    } catch (err){
        throw Error( `user ${id} not found..` )
    };
};

const login = async (username) => {
    try {
        const user = await User.findOne(username);
        if (!user){
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw new Error( `${username} not registered.` );
    }
};

module.exports = { createUser, getAllUsers, getUserById, editUser, deleteUser, login };
