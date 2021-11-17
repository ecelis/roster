import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'

export default function FeaturedTurnament ({ tournament }) {
  return (
    tournament.map(t => {
      return (
        <Grid key={t._id} item xs={12} md={6}>
          <CardActionArea component='a' href={`/tournament/${t._id}`}>
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component='h2' variant='h5'>
                  {t.name}
                </Typography>
                <Typography variant='subtitle1' color='text.secondary'>
                  {new Date(t.fromDate).toLocaleDateString()} a {new Date(t.toDate).toLocaleDateString()}
                </Typography>
                <Typography variant='subtitle1' color='primary'>
                  Enroll in tournament...
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      )
    })
  )
}
