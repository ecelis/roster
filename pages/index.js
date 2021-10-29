import { Fragment } from 'react'
import Layout from '../components/layout'
import { Container } from '@mui/material'
import { Paper } from '@mui/material'
import { Typography } from '@mui/material'
import FeaturedTurnament from '../components/FeaturedTournament'
import { tournament } from "../mock/data";

export default function Page () {
  return (
    <Layout>
      <FeaturedTurnament tournament={tournament} />
    </Layout>
  )
}