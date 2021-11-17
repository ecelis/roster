import Layout from '../components/layout'
import FeaturedTurnament from '../components/FeaturedTournament'
import { useEffect, useState } from 'react';
import { get } from '../lib/api';

export default function HomePage () {
  const [ state, setState ] = useState([]);
  useEffect(async () => {
    const json = await get('tournament');
    const { data } = json;
    
    setState(data);
    sessionStorage.setItem('tournaments', JSON.stringify(data));
  },[]);
  
  return (
    <Layout>
     {state.data ? <FeaturedTurnament tournament={state.data} /> : null}
    </Layout>
  )
}