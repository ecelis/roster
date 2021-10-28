import Header from '../components/header'
import Footer from '../components/footer'
import { Container } from '@mui/material'

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