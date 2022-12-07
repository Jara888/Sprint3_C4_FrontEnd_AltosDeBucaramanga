const path=require('express')
const express=require('express')
const router=express.Router()

router.get("/Home",(req,res)=>{
res.render("Menu")
})

router.get("/homeowner",(req,res)=>{
res.render("Propietarios")
})

router.get("/Inmuebless",(req,res)=>{
res.render("Inmuebles")
})

router.get("/Facturass",(req,res)=>{
res.render("Facturas")
})

router.get("/Reportess",(req,res)=>{
    res.render("reportes")
    })

router.get("/loginn",(req,res)=>{
res.render("Index")
})

module.exports=router