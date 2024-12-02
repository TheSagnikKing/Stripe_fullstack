// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// const ProductDisplay = ({ handleCheckout }) => (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//         <h3>Stubborn Attachments</h3>
//         <h5>$20.00</h5>
//       </div>
//     </div>
//     <button onClick={handleCheckout}>Checkout</button>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p style={{
//       color: "Order placed! You will receive an email confirmation." ? "green" : "red"
//     }}>{message}</p>
//   </section>
// );

// export default function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   const handleCheckout = async () => {
//     try {
//       const response = await axios.post("http://localhost:8001/create-checkout-session", {
//         items: [{ id: "stubborn_attachments", quantity: 1 }], // Example item
//       });

//       // Redirect to Stripe Checkout
//       const { url } = response.data;
//       window.location.href = url;
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//     }
//   };

//   return message ? (
//     <Message message={message} />
//   ) : (
//     <ProductDisplay handleCheckout={handleCheckout} />
//   );
// }


import React from 'react'
import "./App.css"
import Stripe from './Stripe'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Success from "./Success"
import Cancel from "./Cancel"

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stripe />}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/cancel" element={<Cancel/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App