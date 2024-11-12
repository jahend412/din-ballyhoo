const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 8080;

// <--- Middleware --->
app.use(cors());
app.use(express.json());

// <--- MongoDB Connection --->
mongoose.connect('mongodb://localhost:27017/din-ballyhoo', {
}).then(() => 
    console.log('MongoDB Connected'))
    .catch(err => console.log(err));

    // <--- Routes --->

app.get('/', (req, res) => {
res.send('This is working');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});