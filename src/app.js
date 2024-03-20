const express = require('express');
const { dictionaryRouter } = require('./routes/dictionary.router');
const port = 8080; 

const app = express(); 

/** route matching testing tool : https://forbeslindesay.github.io/express-route-tester/ */

// app.get('/api/dictionary/:word([a-z]+)', (req, res)=>{
//     res.send(req.params.word)
// })

app.use('/api/dictionary', dictionaryRouter);

app.listen(port, ()=>console.log(`Server up and running on port ${port}`))
