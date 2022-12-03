const path=require('express')
const express=require('express')
const router=express.Router()



router.get("/Home",(req,res)=>{
res.render("index")

})

router.get("/homeowner",(req,res)=>{
res.render("Propietarios")

})

module.exports=router