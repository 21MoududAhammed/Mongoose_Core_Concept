import express, {Request, Response} from 'express';

const app = express();

// middleware 
app.use(express.json());

app.get('/', (req:Request, res: Response)=>{
    res.send('Hello dear! How are you?');
})


export default app;