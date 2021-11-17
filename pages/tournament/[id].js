import { useRouter } from 'next/dist/client/router';
import Layout from '../../components/layout'
import RegisterSteps from '../../components/RegisterSteps'
import { useSession } from 'next-auth/react'
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { response } from '../../lib/api';

export default function RegistrationPage () {
    const { data: session, status } = useSession();
    const [ tournament, setTournament ] = useState();
    const router = useRouter();
    
    useEffect(async () => {
        if (sessionStorage.getItem('tournaments')) {
            setTournament(JSON.parse(sessionStorage.getItem('tournaments')).find(e => {
                return e._id === router.query.id;
            }));
        } else {
            const json = await response('tournament');
            const { data } = json;

            setTournament(data.find(e => {
                return e._id === router.query.id
            }));
            sessionStorage.setItem('tournaments', JSON.stringify(data));
        }
    }, [router]);

    const loading = status === 'loading';
    
    return (
        <Layout>
            {(!session && tournament) && <>
                <p>Sign in to register in {tournament.name} from {new Date(tournament.fromDate).toLocaleDateString()} to {new Date(tournament.toDate).toLocaleDateString()}</p>
            </>}
            {(session && tournament) &&
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6}, p: { xs: 2, md: 3} }}>
                    <Typography component="h1" variant="h4" align="center">{`Registro ${tournament.name}`}</Typography>
                    <Typography component="h6" variant="p" align="center">{`${new Date(tournament.fromDate).toLocaleDateString()} a ${new Date(tournament.toDate).toLocaleDateString()}`}</Typography>
                    <RegisterSteps tournament={tournament} />
                </Paper>
            }
        </Layout>
    )
}
