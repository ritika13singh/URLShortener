const express = require("express");
const connectDB = require('./config/db');
const app = express();

//connect to mongoDB
connectDB();

app.use(express.json({extended: false}));

//defining routes
app.use('/',require('./routes/index'));
app.use('/api/url/',require('./routes/url'));


PORT = 5000;
app.listen(PORT,()=>{console.log(`Server is up and running at port ${PORT}`)}); 
