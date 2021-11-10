import Layout from '../components/layout'
import FeaturedTurnament from '../components/FeaturedTournament'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page () {
  const [ state, setState ] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/tournament`)
      .then(res => {
        const json = res.data;
        setState(json);
        sessionStorage.setItem('tournaments', JSON.stringify(json.data));
      });
  },[]);
  
  return (
    <Layout>
     {state.data ? <FeaturedTurnament tournament={state.data} /> : null}
    </Layout>
  )
}