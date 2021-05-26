import express from 'express';
import cors from 'cors';
import { connect } from './includes/database.js';

import authRouter from './routes/auth.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/user', authRouter);
// Database
connect();

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})