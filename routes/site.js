const path=require('express')
const express=require('express')
const router=express.Router()



router.get("/Home",(req,res)=>{
res.render("Menu")

})

router.get("/homeowner",(req,res)=>{
res.render("Propietarios")

})

<<<<<<< HEAD
router.get("/property",(req,res)=>{
=======
router.get("/Inmuebless",(req,res)=>{
>>>>>>> 048ab82 (login y menú creados ok actualización)
res.render("Inmuebles")

})

<<<<<<< HEAD
module.exports=router
=======
router.get("/Facturass",(req,res)=>{
res.render("Facturas")

})

router.get("/loginn",(req,res)=>{
res.render("Index")

})


module.exports=router
>>>>>>> 048ab82 (login y menú creados ok actualización)
