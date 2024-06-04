const express = require('express')
const app = express()
const port = 3000
const cors=require('cors')

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://riderghost10791:8EFxDqYJVdQvtZ2y@resturant.sbtcmeo.mongodb.net/?retryWrites=true&w=majority&appName=resturant";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollections=client.db('resturant').collection('menus')
    const cartCollections=client.db('resturant').collection('cart')
    
    app.get('/menu',async (req,res)=>{
        const result= await menuCollections.find().toArray()
        res.send(result)
    })

    app.post('/cart',async(req,res)=>{
        const cartitems=req.body;
        const result=await cartCollections.insertOne(cartitems)
        res.send(result)
    })

    app.get('/cart',async(req,res)=>{
      const email=req.query.email;
      const mail={email:email}
      const result=await cartCollections.find(mail).toArray()
      res.send(result)
  })

    app.get('/cart/:id',async (req,res)=>{
      const id=req.params.id;
      const filter={_id:new ObjectId(id)}
      const result=await cartCollections.findOne(filter)
      res.send(result)
    })

  app.delete('/cart/:id',async (req,res)=>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)}
    const result=await cartCollections.deleteOne(filter)
    res.send(result)
  })

  app.put('/cart/:id',async (req,res)=>{
    
      const id = req.params.id;
      const { quantity } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const update = { $set: { quantity: parseInt(quantity, 10) } };
      const result = await cartCollections.updateOne(filter, update, options);
  
      
  })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})