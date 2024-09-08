const express=require('express');
const app=express();


require('dotenv').config();
const port=process.env.port || 3000;

app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const dbconnect=require('./config/database');
dbconnect.connect();

const cloudinary=require('./config/cloudaniry');
cloudinary.cloudinaryConnect();

const upload=require('./routes/fileupload');
app.use('/api/v1/upload',upload);


app.get('/',(req,res)=>{
    res.send('Hello World let us upload files');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})