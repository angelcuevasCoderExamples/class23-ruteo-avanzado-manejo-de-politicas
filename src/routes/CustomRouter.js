const {Router} = require('express');
const jwt = require('jsonwebtoken');

class CustomRouter {
    constructor(){
        this.router = Router();
        this.initialize();
    }

    initialize(){} //<---esto debe "sobreescribirse" en cada clase hija
    getRouter(){
        return this.router; 
    }

    applyCallbacks(callbacks){
        return callbacks.map(cb=>async (...params)=>{  //params: req, res, next
            try {
                await cb(...params)
            } catch (error) {
                params[1].status(500).send({error: error.message})
            }
        })
    }

    addCustomResponses(req, res, next){
        res.sendSuccess = (payload)=>res.status(200).send({status:'sucess', payload})
        res.sendServerError = (error)=> res.status(500).send({status:'error', error})
        res.sendUserError = (error)=> res.status(400).send({status:'error', error})

        next();
    }

    get(path,policies,...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.addCustomResponses, this.applyCallbacks(callbacks)) //this.applyCallbacks(callbacks)
    }

    post(path,policies, ...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.addCustomResponses, this.applyCallbacks(callbacks))
    }

    put(path,policies, ...callbacks){
        this.router.put(path, this.handlePolicies(policies), this.addCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path,policies, ...callbacks){
        this.router.delete(path, this.handlePolicies(policies), this.addCustomResponses, this.applyCallbacks(callbacks))
    }

    handlePolicies(policies){ //ej:["ADMIN","USER"...etc]
        return (req, res, next)=>{
            if(policies[0] == "PUBLIC" && policies.length == 1){
                return next();
            }

            const token = this.getToken(req)
            if(!token){
                return res.status(403).send({status:'error', error:'Not authorized'})
            }

            const user = jwt.verify(token,'secret') //ej: {role:"ADMIN"}
            console.log("USER", user)

            if(!policies.includes(user.role.toUpperCase())){
                return res.status(403).send({status:'error', error:'Not authorized'})
            }

            req.user = user; 

            next();
        }
    }

    getToken(req){
        const authHeader = req.headers.authorization; 
        if(!authHeader){
            return null 
        }
        //token:  bearer tokencaracters
        const token = authHeader.split(' ')[1]
        return token; 
    }

}


module.exports = CustomRouter; 