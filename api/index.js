const express=require("express")
const dotenv=require("dotenv");
const mainRouting=require("./routes");

const app=express();
dotenv.config();

app.use(express.json());
mainRouting(app)

app.get("/",(req,res)=>{
    res.status(200).json({
        status:"API Server is running..."
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server on port ${process.env.PORT}`);
});