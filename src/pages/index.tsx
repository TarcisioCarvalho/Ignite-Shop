import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { styled } from '../styles'
import styles from '../styles/Home.module.css'
import { HomeContainer, Product } from '../styles/pages/home'

import {useKeenSlider} from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import camiseta1 from '../assets/camisetas/1.png';
import camiseta2 from '../assets/camisetas/2.png';
import camiseta3 from '../assets/camisetas/3.png';
import camiseta4 from '../assets/camisetas/4.png';

const Home: NextPage = () => {
  const [sliderRef] = useKeenSlider({
    slides:{
      perView:3,
      spacing:48
    }
  })


  return (
   <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className='keen-slider__slide'>
        <Image src={camiseta1} width={520} height={400} alt=""/>
       <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
       </footer>
      </Product>
      <Product className='keen-slider__slide'>
        <Image src={camiseta2} width={520} height={400} alt=""/>
       <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
       </footer>
      </Product>
      <Product className='keen-slider__slide'>
        <Image src={camiseta3} width={520} height={400} alt=""/>
       <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
       </footer>
      </Product>
      <Product className='keen-slider__slide'>
        <Image src={camiseta4} width={520} height={400} alt=""/>
       <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
       </footer>
      </Product>

    
   </HomeContainer>
  )
}

export default Home
