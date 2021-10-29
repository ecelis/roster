import Header from '../components/header'
import Footer from '../components/footer'
import { Container } from '@mui/material'
import 'github-fork-ribbon-css/gh-fork-ribbon.css'

export default function Layout ({children}) {
  return (
    <>
      <Header/>
      <Container component="main" maxWidth="sm" sx={{ md: 4 }}>
        {children}
      </Container>
      <Footer/>
    </>
  )
}