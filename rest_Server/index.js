const express = require('express')
const app = express()
const mongoose=require('mongoose')
const cors=require('cors')
const jwt = require('jsonwebtoken');
const crypto=require('crypto')

const port = 3000

app.use(cors());
app.use(express.json());
mongoose.connect(`mongodb+srv://riderghost10791:Ft5YSDIKsiNFXXY6@rest-database.zgxw9ce.mongodb.net/rest-database?retryWrites=true&w=majority&appName=rest-database`).then(()=>{
    console.log('Mongo DB connected');
}).catch((error)=>{console.log(error);})

app.post('/jwt', async(req, res) => {
  const user = req.body;
  const token = jwt.sign(user, "8cb3920556475ac0e1e9bc1a3500d43910ec491e041d709068257a55af51733df079d058a17731eac45189fa4d2dc93dfe59922d1ba4ea784e483d67cb0b740a", {
    expiresIn: '1hr'
  })
  res.send({token});
})

const verify=(req,res,next)=>{
  console.log(req.headers.authorization);
  if(!req.headers.authorization){
    return res.status(401).send({message:"Unauthorised access"})
  }
}

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
