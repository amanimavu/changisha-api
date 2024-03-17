import express from 'express'
import userRouter from 'api/users.js'
const app = express()

app.use(express.json())
app.use('/', userRouter)

app.listen(3000, 'localhost', () => {
    console.log('Listening from port 3000...')
})
