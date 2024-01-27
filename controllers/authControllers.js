const User = require('../models/user');
const auth = require('../middleware/jwt');
const bcrypt = require('bcrypt');
const usersService = require('../services/users');
const { signupPayloadValidator } = require('../utils/schemaValidator');

const createUser = async (req, res) => {
    try {
        if (req.body.password != req.body.confirmPassword){
            return res.status(400).json({ message: 'Password mismatch. Try again. '});
        }

        const { error, val } = signupPayloadValidator(req.body);
        if (error){
            return res.status(400).json(error.details[0].message);
        }

        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({ message: 'Email already registered. Provide another valid email' });
        }

        const maxAge = 90 * 24 * 60 * 60

        const newUser = await usersService.createUser({ ...req.body });
        
        const token = auth.createToken(newUser._id);
        res.cookie('Authorization', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log({ user: newUser, tkn: token });
        return res.status(201).json({ message: 'User created sucessfully', user: newUser._id })
    } catch (err){
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    };
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
       
        const user = await usersService.login({username});
        if (!user){
            return res.status(400).json('Incorrect email. Try Again');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.stat(401).json({message: 'Incorrect password; Try again'});
        }

        const token = await auth.createToken(user.__id);
        res.cookie('Authorization', token, {httpOnly: true, maxAge: (90 * 24 * 60 * 60 * 1000)});
        console.log({user: user, token: token});
        return res.status(200).json(`user ${user._id} logged in.`);
    } catch (err) {
        return res.status(400).json(err.message)
    }
};

module.exports = { createUser, login };
