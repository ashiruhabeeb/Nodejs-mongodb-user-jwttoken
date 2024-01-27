const usersService = require('../services/users');
const userEditPayloadValidator = require('../utils/schemaValidator')

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json({data: users})
    } catch (err){
        res.status(500).json({
            error: true,
            msg: "couldn't fetch any record",
            errType: 'internal server error',
        })
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usersService.getUserById(id);
        return res.status(200).json({ data: user })
    } catch (err) {
        if (err.message === 'not found'){
            return res.status(401).json({ message: err.meassage });
        } else {
            return res.status(500).json(err.message);
        };
    };
};

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const { firstname, lastname, username, email, phone, address } = req.body;

        const { valError } = userEditPayloadValidator(req.body);
        if (valError){
            return res.status(400).json(error.details[0].message)
        };
        
        const user = await usersService.editUser( id, firstname, lastname, username, email, phone, address );
        if (!user) {
            return res.status(404).json(`User ${req.params.id} not found`);
        };
        return res.status(200).json({ data: user });
    } catch (err) {
        return res.status(500).json({ error: `error updating user with id_${req.params.id}` });
    };
};

const deleteUser = async (req, res) => {
try {
    const { id } = req.params;

    error = await usersService.deleteUser(id);

    return res.status(200).json({ message: `user ${id} successfully deleted` })
} catch (err){
    return res.status(500).json(err.message);
    };
};

const logout = async (req, res) => {
    res.cookie('Authorization', '', {maxAge: 1});
    res.status(200).json({ message: 'Logged out and redirected to homepage' })
    res.redirect('/home');
};

module.exports = { getUsers, getUserById, updateUser, deleteUser, logout };
