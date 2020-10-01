const express = require("express");
const connectDB = require('./config/db');
//const router = require('./routes/router');
const app = express();

//connect to mongoDB
connectDB();



app.set('view engine','ejs');
app.use('/',express.static('index'));
app.use(express.json({extended: false}));
app.use(express.urlencoded({
    extended:true
}));
//defining routes
app.use('/',require('./routes/index'));
app.use('/api/url/',require('./routes/url'));

app.get('/',(req,res)=>{
    res.render('index',{short:""});

})

PORT = 5000;
app.listen(PORT,()=>{console.log(`Server is up and running at port ${PORT}`)}); 
