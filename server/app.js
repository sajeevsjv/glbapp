const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require("./db/mongoConnect");
const fs = require('fs');
const path = require('path');
const glbRoutes = require("./routes/glbRoutes");

const filedir = path.join(__dirname, 'uploads');

if(!fs.existsSync(filedir)) {
    fs.mkdirSync(filedir, { recursive: true });
    console.log("Directory created successfully :", filedir);
}

mongoConnect();

app.use(cors({
    origin: 'https://glbapp-frontend.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.get("/", (req,res)=>{
    res.send("nice bro, continue");
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(glbRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
