import { useRouter } from 'next/router';
import React from 'react'

const Product = () => {
  const {query} = useRouter();
  
  return (
    <div>{JSON.stringify(query)}</div>
  )
 
}

export default Product