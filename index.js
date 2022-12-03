const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is another text we write");
});

const users = [
  { id: 1, name: "raul", age: 20, email: "raul12@gmail.com" },
  { id: 2, name: "romesh", age: 23, email: "rom2929@gmail.com" },
  { id: 3, name: "kousik", age: 32, email: "kousik123@gmail.com" },
];

// User Name -> dbUser
//Password -> jhojPi6DBsNDa2WB

const uri =
  "mongodb+srv://dbUser:jhojPi6DBsNDa2WB@cluster0.s14y4qr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");
    // const user = {
    //   name: "Zero Alom",
    //   email: "herotoziro@gmail.com",
    // };
    // const result = await userCollection.insertOne(user);
    // console.log(result);
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      user._id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}
run().catch(console.dir);

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.post("/user", (req, res) => {
//   console.log("Post api called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   res.send(user);

//   console.log(req.body);
// });

app.listen(port, () => {
  console.log(`My node server running on ${port}`);
});



// Mongo Atlas 
// Email - rehekah827@ilusale.com 
// Password - Hero@2022