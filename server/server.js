require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db');
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('api running'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
