import 'dotenv/config.js';
import mongoose from 'mongoose';

const mongoURI = process.env.ATLAS_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

export const connect = () => {
    connection.once('open', () => {
        console.log('MongoDB conected');
    });    
}
