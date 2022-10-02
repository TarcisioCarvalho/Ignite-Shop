import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';
import Stripe from 'stripe';
import Image from 'next/image'
import axios from 'axios';
import Head from 'next/head';
interface ProductProps{
  product:{
    id:string,
    name:string,
    imageUrl:string,
    price:string,
    description:string,
    defaultPriceId:string,
    }
}

const Product = ({product} : ProductProps) => {

  const [isCreatingCheckoutSection, setIsCreatingCheckoutSection] = React.useState(false);

  async function handleBuyProduct(){
    try {
      setIsCreatingCheckoutSection(true);
      const response = await axios.post('/api/checkout',{
        priceId:product.defaultPriceId,
      })

      const {checkoutUrl} = response.data;
      window.location.href = checkoutUrl;

    } catch (error) {
      setIsCreatingCheckoutSection(false);
      alert('Falha ao redirecionar checkout');
    }
  }
  
  return (
    <>
      <Head>{product.name} | Ignite Shop</Head>
      <ProductContainer>
        <ImageContainer>
        <Image src={product.imageUrl} width = {520} height = {480} alt = ''/>
        </ImageContainer>
        <ProductDetails>

          <h1>{product.name}</h1>
          <span>R$ {product.price}</span>
          <p> {product.description}</p>

          <button disabled={isCreatingCheckoutSection} onClick={handleBuyProduct}>
            Comprar
          </button>

        </ProductDetails>
      </ProductContainer>
    </>
  )
 
}

export default Product

export const getStaticPaths : GetStaticPaths = async () => {
  return{
    paths:[{params : {id : 'prod_MWvrS2QwLWTlSN'}}],
    fallback:true,
  }
  
}

export const getStaticProps : GetStaticProps<any,{id:string}> =async ({params}) => {
  const productId = params.id;
  console.log(productId);
  const product = await stripe.products.retrieve(productId,{
    expand:['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return{
    props:{
      product:{
        id : product.id,
        name : product.name,
        imageUrl : product.images[0],
        price: new Intl.NumberFormat('pt-BR',{
          style:'currency',
          currency:'BRL',
        }).format(price.unit_amount! / 100),
        description:product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate:60 * 60 * 1,
  }
}