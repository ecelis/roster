import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) throw new Error('Review MONOGDB_* variables');

const { MONGODB_URI, MONGODB_DB } = process.env;
export const mongodbUri = MONGODB_URI + MONGODB_DB + 'retryWrites=true&w=majority';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(mongodbUri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(mongodbUri, options);
    clientPromise = client.connect();
}

export default clientPromise;
