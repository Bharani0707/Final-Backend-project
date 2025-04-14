const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./model/Employee')
const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://bharanikumar843:Spiral%40123@cluster0.ammbj.mongodb.net/viteproject?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));
app.post('/register',(req,res)=>{
  
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))

    .catch(err=>res.json(err))

})
app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(!user) {
            res.json("User not found");
        } else if(user.password === password) {
            res.json("success");
        } else {
            res.json("incorrect password");
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json("An error occurred");
    });


})

app.listen(4000, ()=>{
    console.log("server is running")

});