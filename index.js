const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

//middlewere

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.i6scrno.mongodb.net/?retryWrites=true&w=majority`;

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

    const productsCollection = client.db('jewllyShop').collection('products')
    const cartsCollection = client.db('jewllyShop').collection('carts')

    //get all products
    app.get('/products',async(req,res) =>{
        const result = await productsCollection.find().toArray()
        res.send(result)
    })



    //post single product
    app.post('/products',async(req,res) =>{
        const product = req.body
        const result = await productsCollection.insertOne(product)
        res.send(result)
    })

    //single products details
    app.get('/products/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await productsCollection.findOne(query)
        res.send(result)
      })

      app.delete('/products/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await productsCollection.deleteOne(query)
        res.send(result)
      })

      //single product details update

      app.patch('/products/:id', async (req, res) => {
        const id = req.params.id
        const updatedData = req.body
        const filter = { _id: new ObjectId(id) }
        const updatedDoc = {
          $set: {
            ...updatedData
          }
        }
        const result = await productsCollection.updateOne(filter, updatedDoc)
        res.send(result)
      })

    //add products cart api
    app.post('/carts',async(req,res) =>{
        const cart = req.body
        const result = await cartsCollection.insertOne(cart)
        res.send(result)
    })

    //get all cart products

    app.get('/carts', async (req, res) => {
        const result = await cartsCollection.find().toArray()
        res.send(result)
      })

   





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send(' jewelry shop side is running')
  })
  
  app.listen(port, () => {
    console.log(` jewelry shop side is running on port, ${port}`)
  })