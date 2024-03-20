const express = require('express');
const SessionRouter = require('./routes/SessionRouter');
const UserRouter = require('./routes/UserRouter');
const port = 8080;

const app = express();

/** middlewares */
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//app.use('/api/pets', petsRouter)
const userRouter = new UserRouter();
app.use('/api/users', userRouter.getRouter())

const sessionRouter = new SessionRouter();
app.use('/api/sessions', sessionRouter.getRouter())

app.listen(port, ()=>console.log(`running on port ${port}`))