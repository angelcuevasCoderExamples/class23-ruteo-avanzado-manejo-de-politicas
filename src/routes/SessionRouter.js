const CustomRouter = require("./CustomRouter");
const jwt = require('jsonwebtoken');

const users = [{email:'user@email.com', role:'user'}, {email:'admin@email.com',role:'admin'}]

class SessionRouter extends CustomRouter {
    initialize(){
        this.post('/', ['PUBLIC'], (req, res)=>{
            // let user = {
            //     email: req.email, 
            //     role:'user'
            // }
            let user = users.find(u=>u.email == req.body.email)

            const token = jwt.sign(user, 'secret')
            res.sendSuccess({token})
        })
    }
}

module.exports = SessionRouter;