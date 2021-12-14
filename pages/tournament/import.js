import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import {
    Paper,
    Typography
} from "@mui/material"

export default function ImportPage () {
    const { data: session, status } = useSession()
    const loading = status === 'loading'
  
    return (
      <Layout>
        {!session &&
          <>
            <p>Denied</p>
          </>}
        {session &&
          <Paper variant='outlined' xs={12}>
            <Typography component='h1' variant='h4' align='center'>{`Import Tournament`}</Typography>
            <iframe src="http://localhost:8080/Api/JSON/Competitions.php"
            width="800"></iframe>
            <iframe src="http://localhost:8080/Api/ISK/GetCompInfo.php?CompCode=TEST2021">width="800"></iframe>
          </Paper>}
      </Layout>
    )
  }