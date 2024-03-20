const CustomRouter = require("./CustomRouter");

class UserRouter extends CustomRouter {
    initialize(){

        this.get('/', ["PUBLIC"],(req,res)=>{
            res.sendUserError(`Hello! you've reached is a custom router`)
        })

        this.post('/',["PUBLIC"],(req, res)=>{
            const {first_name, last_name} = req.body; 
            if(!first_name || !last_name) return res.sendUserError('invalid parameters')

            res.sendSuccess('User created successfuly')
        })

        this.get('/public', ["PUBLIC"],(req, res)=>{
            res.sendSuccess('Public resource')
        })
        this.get('/private', ["USER","ADMIN"],(req, res)=>{
            res.sendSuccess('Public resource')
        })

        this.get('/admin', ["ADMIN"],(req, res)=>{
            res.sendSuccess('Public resource')
        })

    }
    
}

module.exports = UserRouter;