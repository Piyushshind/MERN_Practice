const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const todoRouts = require('./routs/todoRouts');

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos/', todoRouts);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})