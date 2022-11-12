import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise, { mongodbUri } from '../../../lib/mongodb'

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  database: mongodbUri,
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.SECRET
  },
  pages: {},
  callbacks: {
    async session ({ session, token, user }) {
      return {
        user: { ...session.user, ...{ id: token.sub } },
        expires: session.expires
      }
    }
  },
  events: {},
  theme: { colorScheme: 'light' },
  debug: false
}

export default NextAuth(authOptions)
