import express, { Request, Response } from 'express';
import { studentRoutes } from './app/modules/student.route';
import cors from 'cors';

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello dear! How are you?');
});

export default app;
