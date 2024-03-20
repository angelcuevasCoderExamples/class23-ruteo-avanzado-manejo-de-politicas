const {Router} = require('express');

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

    get(path,...callbacks){
        this.router.get(path, this.addCustomResponses, this.applyCallbacks(callbacks)) //this.applyCallbacks(callbacks)
    }

    post(path, ...callbacks){
        this.router.post(path, this.addCustomResponses, this.applyCallbacks(callbacks))
    }

    put(path, ...callbacks){
        this.router.put(path, this.addCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path, ...callbacks){
        this.router.delete(path, this.addCustomResponses, this.applyCallbacks(callbacks))
    }

}


module.exports = CustomRouter; 