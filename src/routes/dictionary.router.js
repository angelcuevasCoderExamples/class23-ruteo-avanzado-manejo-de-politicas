const {Router} = require('express');

const router = Router();

//%C3 <---tilde
//%20 <---espacio
router.get('/:word([a-z0-9%20]+)', (req, res)=>{
    //buscar palabra en db 
    res.send({word:req.word})
})

router.param('word', (req, res, next, word)=>{
    req.word = word;
    next()
})

router.get('*',(req, res)=>{
    res.status(404).send({status:'error', error:'Cannot access word'})
})

module.exports = {
    dictionaryRouter: router
}