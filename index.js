require("dotenv").config();
const url = require("url");

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
      const parsedUrl = url.parse(req.url, true);
      console.log(parsedUrl);
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home Server");
      } else if (parsedUrl.pathname === "/properties" && req.method === "GET") {
        const type = parsedUrl.query.type;
        const category = parsedUrl.query.category;
        const location = parsedUrl.query.location;

        const filter = {};

        if (type) filter.type = '';
        if (category) filter.category = category;
        if (location) filter.location = location;

        const all_properties = await property_collection.find(filter).toArray();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(all_properties));
      }
    });

    server.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  } finally {
  }
}
run().catch(console.dir);
