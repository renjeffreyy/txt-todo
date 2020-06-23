require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db');
const PORT = process.env.PORT || 5000;

//establish connection to MongoDB
connectDB();

//allows us to parse JSON
app.use(express.json());

//Define Routes
app.use('/api/', required('./'));

app.get('/', (req, res) => res.send('api running'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
