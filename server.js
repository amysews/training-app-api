import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import apiRouter from './routes/api'

dotenv.config();
const app = express()
const router = express.Router()

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'HI! YAY! Congratulations! Your first endpoint is working'});
})

app.use('/api', apiRouter)

app.listen(3000)
console.log('app running on port ', 3000);