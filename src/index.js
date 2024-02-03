const express = require('express');
const userRouter = require('./routes/user.routes')
const cors = require('cors')
// const locationRouter = require('./routes/location.routes')

const app = express();

app
    .use(express.json())
    .use(cors())
    .use('/api/user', userRouter)

app.listen(8080, () => {console.log("Server start...")})