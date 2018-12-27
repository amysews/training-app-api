import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import apiRouter from './routes/api'
import cors from 'cors'

dotenv.config();
const app = express()
const router = express.Router()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'HI! YAY! Congratulations! Your first endpoint is working'});
})

app.use('/api', apiRouter)

const port = process.env.PORT || 3000
app.listen(port)
console.log('app running on port ', port);