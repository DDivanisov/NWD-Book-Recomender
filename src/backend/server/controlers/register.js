const mongodbconnection = require("../mongodbconnection");
const signup = require('../token');

async function register(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const users = await mongodbconnection.connect("Users");
        const existingUser = await users.findOne({ $or: [{ email: email }, { username: username }] });

        if (existingUser) {
            return res.status(409).send({ msg: 'Username or email already in use!' });
        }

        const result = await users.insertOne({
            username,
            email,
            password
        });
       
        user = {
            username,
            email,
            password
        }
        res.send({
            user: user,
            token: signup.jwtTokenCreate(user)
        });
    } 
    catch (error) {
        res.status(500).send({ msg: 'Internal Server Error' });
    }
}

module.exports = {
    register
}