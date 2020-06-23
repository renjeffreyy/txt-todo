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
app.use('/api/users', require('./routes/api/users.routes'));
app.use('/api/blog', require('./routes/api/blog-entries.routes'));
app.use('/api/auth', require('./routes/api/auth.routes'));

app.get('/', (req, res) => res.send('api running'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
