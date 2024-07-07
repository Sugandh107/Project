const express = require('express')
const app = express()
const mongoose=require('mongoose')
const cors=require('cors')

const port = 3000

app.use(cors());
app.use(express.json());
mongoose.connect(`mongodb+srv://riderghost10791:Ft5YSDIKsiNFXXY6@rest-database.zgxw9ce.mongodb.net/rest-database?retryWrites=true&w=majority&appName=rest-database`).then(()=>{
    console.log('Mongo DB connected');
}).catch((error)=>{console.log(error);})

const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
app.use('/menu',menuRoutes)
app.use('/cart',cartRoutes)
app.use('/user',userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//riderghost10791
//Ft5YSDIKsiNFXXY6
//mongodb+srv://riderghost10791:Ft5YSDIKsiNFXXY6@rest-database.zgxw9ce.mongodb.net/?retryWrites=true&w=majority&appName=rest-database