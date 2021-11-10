import clientPromise from "../../../lib/mongodb";
import sendResponse from "../../../lib/api";

const dbHandler = async function() {
    const client = await clientPromise;
    await client.connect();
    const db = await client.db();
    const collection = await db.collection('tournaments');
    return { client, collection };
}

export default async function handler(req, res) {
    let payload = [];
    const { client, collection } = await dbHandler();

    switch (req.method) {
        case 'GET':
            try {
                payload = sendResponse(await collection.find({}).toArray());
            } finally {
                client.close();
            }
            break;
        default:
            client.close();
            payload = sendResponse('Unsupported method', true);
    }

    res.json(payload);
}