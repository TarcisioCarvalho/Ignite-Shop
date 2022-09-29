
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logo from '../assets/logo.svg';
import { Container, Header } from '../styles/pages/app';
import Image from 'next/future/image'
import image from '../assets/home.png';
globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Container>
      <Header>
          <Image src={logo} alt ="Logo"/>
      </Header>
      <Component {...pageProps} />
    </Container>
    
  )
}

export default MyApp
