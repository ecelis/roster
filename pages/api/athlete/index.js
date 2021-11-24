import clientPromise from '../../../lib/mongodb'
import { getSession } from 'next-auth/react'
import { validateBirthDate } from '../../../lib/common'


const dbHandler = async function () {
  const client = await clientPromise
  await client.connect()
  const db = await client.db()
  const collection = await db.collection('athletes')
  return { client, collection }
}

const enroll = async function(registration) {
  if (!validateBirthDate(new Date(registration.athlete.birthDate))) return { error: 'Invalid birth date' }
  
  let result = undefined
  const { client, collection } = await dbHandler()
  
  try {
    result = await collection.findOne({
      athlete: registration.athlete,
      tournament: registration.tournament
    })
    
    if (result === null) {
      result = await collection.insertOne(registration)
    }
  } finally {
    client.close()
  }
  
  return result;
}

const findRegistration = async function(email, tId) {
  let result = undefined
  const { client, collection } = await dbHandler()

  try {
    result = await collection.find({
      'athlete.email': email, 'tournament._id': tId
    }).toArray()
  } finally {
    client.close()
  }
  
  return result;
}

export default async function handler (req, res) {
  const session = await getSession({ req })
  
  let result = undefined
  if (session) {
    switch (req.method) {
      case 'POST':
        result = await enroll(req.body)
        break
      case 'GET':
        const { email, tId } = req.query
        if (email && tId) result = await findRegistration(email, tId)
        break
      default:
        result = { error: 'Unsupported method' }
    }
  } else {
    result = { error: 'Unauthorized' }
  }

  res.json(result)
}
