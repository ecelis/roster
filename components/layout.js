import Header from '../components/header'
import Footer from '../components/footer'
import { Container } from '@mui/material'
import 'github-fork-ribbon-css/gh-fork-ribbon.css'

export default function Layout ({ children }) {
  return (
    <>
      <Header />
      <Container component='main' maxWidth='sx' sx={{ md: 12 }}>
        {children}
      </Container>
      <Footer />
    </>
  )
}
