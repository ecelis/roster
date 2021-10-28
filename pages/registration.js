import Layout from '../components/layout'
import RegistrationForm from '../components/Form'
import { useSession } from 'next-auth/react'
import { Paper, Typography } from '@mui/material';

const tournament = {
  id: '617ae89c0bb7f9f7667dfc9b',
  name: 'XYZ',
  fromDate: new Date('2021-11-06T05:00:00.000+00:00'),
  toDate: new Date('2021-11-07T05:00:00.000+00:00'),
  division: [
    {B: 'Barebow'},
    {C: 'Compund'},
    {R: 'Recurve'},
    {L:'Longbow'}
  ],
  klass: [
    {P: 'PreInfantil nacidos 2014-2016 5 a 7 años'},
    {I: 'Infantil nacidos 2011-2013 8 a 10 años'},
    {A: 'Sub14 nacidos 2009-2010 11 a 1 años'},
    {B: 'Sub16 nacidos 2007-2008 14 a 15 años'},
    {C: 'Sub18 nacidos 2005-2006 16 a 17 años'},
    {D: 'Sub20 nacidos 2002-2004 18 a 20 años'},
    {Y: 'Mayor no hay límite de edad'},
    {M: 'Master más de 50 ános'},
    {O: 'Paralímpico'}
  ]
}

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
