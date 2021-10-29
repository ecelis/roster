import Layout from '../../components/layout'
import RegistrationForm from '../../components/RegistrationForm'
import { useSession } from 'next-auth/react'
import { Paper, Typography } from '@mui/material';
import { tournament } from '../../mock/data';

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
          <Typography component="h1" variant="h4" align="center">{`Registro ${tournament.name}`}</Typography>
          <Typography component="h6" variant="p" align="center">{`${tournament.fromDate} a ${tournament.toDate}`}</Typography>
          <RegistrationForm tournament={tournament} />
        </Paper>
      }
    </Layout>
  )
}
