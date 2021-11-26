import { Grid, Typography } from '@mui/material'
import { Fragment } from 'react'

// TODO Get divisions from tournament
function printDivision (state) {
  const division = state.tournament.division.find(d => {
    return d[state.athlete.division]
  })
  return division[state.athlete.division]
}

// TODO Get classes from tournament
function printKlass (state) {
  const klass = state.tournament.klass.find(k => {
    return k[state.athlete.klass]
  })
  return klass[state.athlete.klass]
}

export default function Review ({ state }) {
  const klass = printKlass(state)
  const division = printDivision(state)

  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Summary {state.tournament.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{state.athlete.lastName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{state.athlete.firstName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{
                    state.athlete.gender === 'M' ? 'Man' : 'Woman'
                    }
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{new Date(state.athlete.birthDate).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{division}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>{klass}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  )
}
