const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// buscbd wgMPx5sYcNYZ3yt3


const uri = "mongodb+srv://buscbd:wgMPx5sYcNYZ3yt3@cluster0.outdaiq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    // const database = client.db("insertDB");
    // const usersCollection = database.collection("users");

    const userCollections = client.db("usersDB").collection("users");

    app.get('/users', async(req, res) => {
        const cursor = userCollections.find();
        const result = await cursor.toArray();
        res.send(result);
    });

    app.get("/users/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const user = await userCollections.findOne(query);
      res.send(user);
    });

    app.post('/users', async(req, res) => {
        const user = req.body;
        console.log('new user', user);
        const result = await userCollections.insertOne(user);
        res.send(result);
    });

    app.put('/users/:id', async(req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(id, user);

      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updatedUser = {
        $set: {name: user.name, email: user.email}
      }
      const result = await userCollections.updateOne(filter, updatedUser, options)
      res.send(result);

    })

    app.delete('/users/:id', async(req, res) => {
        const id = req.params.id;
        console.log('please delete from database', id);
        const query = {_id: new ObjectId(id) }
        const  result = await userCollections.deleteOne(query);
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res) => {
    res.send('simple crud is running');
});

app.listen(port, ()=> {
    console.log(`simple crud is running on port: ${port}`);
})