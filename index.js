const { MongoClient, ServerApiVersion } = require("mongodb");
const http = require("http");
const port = 5000;
const uri = `mongodb+srv://${process.env.DB_NAME}-${process.env.DB_PASS}@cluster0.mcintht.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const property_database = client.db("properties");
    const property_collection = property_database.collection(
      "property_collection"
    );
    const server = http.createServer(async (req, res) => {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end('Home Server')
      }
    });

    server.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  } finally {
  }
}
run().catch(console.dir);
