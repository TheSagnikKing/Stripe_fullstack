const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const stripe = require("stripe")("sk_test_51QRTpyG07uuapMPyWzgvxhY67VAuRJFsOhi5yxTbv7GVJMXXDDorgg1aZYCQPKNIlPBuh3mpFXx7Pc9lXz2KyZsR00Zeu15xy7"); // Replace with your Stripe secret key
const bodyParser = require("body-parser");

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://completeAuth123:completeAuth123@cluster0.8s87z6t.mongodb.net/stripedb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define the Payment schema and model
const PaymentSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  amount: Number,
  currency: String,
  paymentIntentId: String,
  status: String,
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
      currency: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);

// Initialize the app
const app = express();
app.use(cors());


const endpointSecret = "whsec_2ac18f1342ab2f8f01876c568138feabea067bff3ee2108080ef85d378b00811"; // Replace with your actual webhook secret

app.post('/api/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    // Construct the event using the raw body and the signature header
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const products = lineItems.data.map((item) => ({
      name: item.description,
      quantity: item.quantity,
      price: item.amount_total / 100, // Amount in dollars (converted from cents)
      currency: session.currency,
    }));

    // Save payment details to MongoDB
    const paymentData = {
      customerEmail: session.customer_details.email,
      customerName: session.customer_details.name,
      amount: session.amount_total, // Convert from cents to dollars
      currency: session.currency,
      paymentIntentId: session.payment_intent,
      status: session.payment_status,
      products: products,
    };

    // Convert amount based on currency
    if (session.currency !== 'jpy' && session.currency !== 'krw') {
      paymentData.amount = paymentData.amount / 100; // Convert to main currency unit
    } else {
      // For JPY, KRW or other currencies that don't need division by 100
      paymentData.amount = paymentData.amount; // Keep it as is
    }

    Payment.create(paymentData)
      .then(() => console.log("Payment saved to database"))
      .catch((err) => console.error("Error saving payment to database:", err));

  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    console.log("Payment Failed ", paymentIntent)
    // It can happen example:
    // If user card has insufficient balance.
    // Here i can send a email to the user that he/she has insufficient balance for that the payment is not completed.
  }
  response.status(200).json({ received: true });
});


app.use(express.json());
app.use(bodyParser.raw({ type: "application/json" })); // For Stripe webhooks


// Create Checkout Session Endpoint
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const productsArray = req.body.products;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Types of card (Visa, MasterCard, etc.)
      mode: "payment",
      line_items: productsArray.map((item) => ({
        price_data: {
          currency: item.currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Amount in cents
        },
        quantity: item.unit,
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.log("Payment Check-Out Failed ", error)
  }
});


// Start the server
app.listen(8001, () => {
  console.log("Server is running on port 8001");
});



