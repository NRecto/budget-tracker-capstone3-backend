const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const port = process.env.PORT || 4000;
const app = express();
require('dotenv').config()

mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', () => { console.log("Error connecting to databse")})
mongoose.connection.once('open', () =>{ console.log("Connected to databse")})

app.use(cors());
app.options('*', cors());
app.use(express.json());

const userRoutes = require('./routes/user.js');
app.use('/api/users', userRoutes);

const categoryRoutes = require('./routes/category');
app.use('/api/category', categoryRoutes);

const ledgerRoutes = require('./routes/ledger');
app.use('/api/ledger', ledgerRoutes);


app.listen(port , ()=> {
    console.log(`App is listening to port ${port}.`)
})