const mongodbconnection = require("../mongodbconnection");
const signup = require('../token');

async function login(req, res){
    const email = req.body.email;
    const password = req.body.password;
    try {
        const users = await mongodbconnection.connect("Users");
        const user = await users.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ msg: 'An acount with that email dose not exist!' });
        }
        else{
            if(user.password === password)
                res.send({
                    user: user,
                    token: signup.jwtTokenCreate(user)
                    
                });
            else
                res.status(409).send({msg: 'The password for that username is incorect!'})
        }
    } 
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ msg: 'Internal Server Error' });
    }
}
module.exports = {
    login
}