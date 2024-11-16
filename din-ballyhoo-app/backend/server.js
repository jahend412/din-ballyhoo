const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE
    .replace('<PASSWORD>',
        process.env.DATABASE_PASSWORD);


// <--- MongoDB Connection --->
mongoose.connect(DB, {
    newUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => 
    console.log('MongoDB Connected'))
    .catch(err => console.log(err));



    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });