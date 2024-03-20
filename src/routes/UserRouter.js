const CustomRouter = require("./CustomRouter");

class UserRouter extends CustomRouter {
    initialize(){

        this.get('/', (req,res)=>{
            res.sendUserError(`Hello! you've reached is a custom router`)
        })

        this.post('/',(req, res)=>{
            const {first_name, last_name} = req.body; 
            if(!first_name || !last_name) return res.sendUserError('invalid parameters')

            res.sendSuccess('User created successfuly')
        })

    }
    
}

module.exports = UserRouter;