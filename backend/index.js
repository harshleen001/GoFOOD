const express = require('express');

const app = express();
 const cors = require('cors');
const PORT = 5000;
const mongoDB = require('./db');
// const { mongo } = require('mongoose');
mongoDB(); // Connect to MongoDB
app.use(cors());
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
