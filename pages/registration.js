import { Fragment } from 'react'
import Layout from '../components/layout'
import { Grid, TextField } from '@mui/material'
import { Paper } from '@mui/material'
import { Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

export default function RegistrationPage () {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <Layout>
      {!session && <>
        <p>Denied</p>
      </>}
      {session &&
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6}, p: { xs: 2, md: 3} }}>
          <Typography component="h1" variant="h4" align="center">Registro</Typography>

          <Fragment>
            <Typography variant="h6" gutterBottom>Athlete</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                required
                id="firstName"
                name="firstName"
                fullWidth
                autoComplete="given-name"
                variant="standard" />
              </Grid>
            </Grid>
          </Fragment>
        </Paper>
      }
    </Layout>
  )
}
