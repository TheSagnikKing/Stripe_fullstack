import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const products = [
    {
      _id: 1,
      image: "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?cs=srgb&dl=pexels-pixabay-279906.jpg&fm=jpg",
      name: "Cricket Bat",
      price: 1500,
      currency: "usd",
      unit: 1
    }
  ]
  

const Stripe = () => {

    
  const makePayment = async (product) => {
    try {
      const stripe = await loadStripe('pk_test_51QRTpyG07uuapMPyR05Ugj2C4Bfz4dX7r81ykr0zlh3hKpZhDT8zS4P0fsW9kOST9MQPszzO2ABbYGVQQSz21YK700uIkkfLdv');

      const response = await axios.post("http://localhost:8001/api/create-checkout-session", {
        products: [product]
      })

      
      if (response.data && response.data.session && response.data.session.id) {
        await stripe.redirectToCheckout({
          sessionId: response.data.session.id,
        });

      } else {
        console.error("Invalid session data: ", response.data);
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <main className='container'>
      {
        products.map((product) => {
          return (
            <div className='product_item' key={product._id}>
              <img src={product.image} alt="camera" />
              <div>
                <p>Product Name: {product.name}</p>
                <p>Product Price: {product.currency}{product.price}</p>
                <p>Quantity: {product.unit}</p>
              </div>
              <button onClick={() => makePayment(product)}>Check-out</button>
            </div>
          )
        })
      }

    </main>
  )
}

export default Stripe