import clientPromise from '../../../lib/mongodb'
import { getSession } from 'next-auth/react'

const dbHandler = async function () {
  const client = await clientPromise
  await client.connect()
  const db = await client.db()
  const collection = await db.collection('athletes')
  return { client, collection }
}

export default async function handler (req, res) {
  const session = await getSession({ req })

  let result
  const { client, collection } = await dbHandler()

  if (session) {
    switch (req.method) {
      case 'POST':
        try {
          result = await collection.insertOne(req.body)
        } finally {
          client.close()
        }
        break
      default:
        client.close()
        result = { error: 'Unsupported method' }
    }
  } else {
    result = { error: 'Unauthorized' }
  }

  res.json(result)
}
