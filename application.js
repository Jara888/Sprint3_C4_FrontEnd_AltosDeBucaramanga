const express=require('express')
const app=express()
const path=require('path')
const cors=require('cors')

const rutas=require('./routes/site')

app.set('port',3008)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use('/',rutas)
app.use(cors())
app.use(express.static(path.join(__dirname,'Public')))

app.listen(app.get('port'),()=>{
console.log("Website escuchando por el puerto",app.get('port'))
console.log(__dirname)
})