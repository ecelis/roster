import { useRouter } from 'next/dist/client/router';
import Layout from '../../components/layout'
import RegisterSteps from '../../components/RegisterSteps'
import { useSession } from 'next-auth/react'
import { Paper, Typography } from '@mui/material';
import { tournament } from '../../mock/data';

export default function RegistrationPage () {
    const router = useRouter();
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const { id } = router.query;
    
    return (
        <Layout>
            {!session && <>
                <p>Denied</p>
            </>}
            {session &&
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6}, p: { xs: 2, md: 3} }}>
                    <Typography component="h1" variant="h4" align="center">{`Registro ${tournament[0].name}`}</Typography>
                    <Typography component="h6" variant="p" align="center">{`${tournament[0].fromDate.toLocaleDateString()} a ${tournament[0].toDate.toLocaleDateString()}`}</Typography>
                    <RegisterSteps tournament={tournament[0]} />
                </Paper>
            }
        </Layout>
    )
}
