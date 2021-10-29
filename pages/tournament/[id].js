import { useRouter } from 'next/dist/client/router';
import Layout from '../../components/layout'
import RegistrationForm from '../../components/RegistrationForm'
import { useSession } from 'next-auth/react'
import { Paper, Typography } from '@mui/material';
import { tournament } from '../../mock/data';

export default function RegistrationPage () {
    const router = useRouter();
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const { id } = router.query;
    console.log(id)
    console.log(tournament[0])

    return (
        <Layout>
            {!session && <>
                <p>Denied</p>
            </>}
            {session &&
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6}, p: { xs: 2, md: 3} }}>
                <Typography component="h1" variant="h4" align="center">{`Registro ${tournament[0].name}`}</Typography>
                <Typography component="h6" variant="p" align="center">{`${tournament[0].fromDate.toLocaleDateString()} a ${tournament[0].toDate.toLocaleDateString()}`}</Typography>
                <RegistrationForm tournament={tournament[0]} />
                </Paper>
            }
        </Layout>
    )
}
