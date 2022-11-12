import { useRouter } from 'next/dist/client/router'
import Layout from '../../components/layout'
import RegisterSteps from '../../components/RegisterSteps'
import { useSession } from 'next-auth/react'
import { Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { get } from '../../lib/api'

export default function RegistrationPage () {
  const { data: session } = useSession()
  const [tournament, setTournament] = useState()
  const [prevReg, setPrevReg] = useState([])
  const router = useRouter()

  useEffect(async () => {
    if (sessionStorage.getItem('tournaments')) {  // eslint-disable-line
      setTournament(JSON.parse(sessionStorage.getItem('tournaments')).find(e => {    // eslint-disable-line
        return e._id === router.query.id
      }))
    } else {
      const json = await get('tournament')
      const { data } = json.data // TODO it reads weird

      setTournament(data.find(e => {
        return e._id === router.query.id
      }))
      sessionStorage.setItem('tournaments', JSON.stringify(data))  // eslint-disable-line
    }
    if (session) {
      const res = await get('athlete', { email: session.user.email, tId: tournament._id })
      // TODO check for success in res
      setPrevReg(res.data)
    }
  }, [router, session])

  return (
    <Layout>
      {(!session && tournament) &&
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <p>Sign in to register in {tournament.name} from
            {' ' + new Date(tournament.fromDate).toLocaleDateString()} to
            {' ' + new Date(tournament.toDate).toLocaleDateString()}
          </p>
        </Paper>}
      {(session && tournament) &&
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>{`Registro ${tournament.name}`}</Typography>
          <Typography component='h6' variant='p' align='center'>{
                    `${new Date(tournament.fromDate).toLocaleDateString()} a ${new Date(tournament.toDate).toLocaleDateString()
                    }`
}
          </Typography>
          {prevReg.length > 0
            ? <p>You are already registered to this tournament</p>
            : <RegisterSteps tournament={tournament} />}
        </Paper>}
    </Layout>
  )
}
