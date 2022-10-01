import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Stripe from 'stripe';
import { HomeContainer, Product } from '../styles/pages/home'

import {useKeenSlider} from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import camiseta1 from '../assets/camisetas/1.png';
import camiseta2 from '../assets/camisetas/2.png';
import camiseta3 from '../assets/camisetas/3.png';
import camiseta4 from '../assets/camisetas/4.png';
import { stripe } from '../lib/stripe';

interface HomeProps{
  products:{
  id:string,
  name:string,
  imageUrl:string,
  price:number
  }[]
}

const Home = ({products}:HomeProps) => {
  const [sliderRef] = useKeenSlider({
    slides:{
      perView:3,
      spacing:48
    }
  })


  return (
   <HomeContainer ref={sliderRef} className='keen-slider'>
      
   {products.map(product => {
    return (
      <Product key={product.id} className='keen-slider__slide'>
        <Image src={product.imageUrl} width={520} height={400} alt=""/>
       <footer>
          <strong>{product.name}</strong>
          <span>R$ {product.price}</span>
       </footer>
      </Product>
    )
   })}
      
    
   </HomeContainer>
  )
}

export default Home

export const getStaticProps : GetStaticProps = async () =>{
  const response = await stripe.products.list({
    expand: ['data.default_price'],
    active:true,
  });

  const products = response.data.map(product =>{
    const price = product.default_price as Stripe.Price;
   return {
    id : product.id,
    name : product.name,
    imageUrl : product.images[0],
    price: new Intl.NumberFormat('pt-BR',{
      style:'currency',
      currency:'BRL',
    }).format(price.unit_amount! / 100),
   }
  })
  return {
    props:{
      products
    },
    revalidate:60 * 60 * 2
  }
}
