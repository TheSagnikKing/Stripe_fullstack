Important Points of this project Configuration

1.  /api/webhook endpoint will always receive data as express.raw. Always put in above express.json() and below database connection.
2. downlaod the stripe exe from the stripe docs and then save the full path of that downloaded stripe.exe in the system environment file.
If i donot do that then i have write the entire path . example "C:\Users\Sagnik\Downloads\stripe.exe" login. If i set stripe = "C:\Users\Sagnik\Downloads\stripe.exe" then i only have to write stripe.
3. After that C:\Users\Sagnik\Downloads\stripe.exe listen --events payment_intent.created,customer.created,payment_intent.succeeded,checkout.session.completed,payment_intent.payment_failed --forward-to http://localhost:8001/api/webhook. Here the port is forward to my backend server that is running and always set those all events.
4. To configure the hosted website webhook for stripe https://dashboard.stripe.com/test/workbench/webhooks 

5. With the checkout endpoint i am creating a new session everytime for the customer and the session get expired after payment completion.
6. /api/webhook this api is called by stripe after i give my card details, email, name etc and hit payment this api will call and if success will save the customer_details with the product details and save it to the database


7. If my server got crash or off during this /api/webhook is calling then see the below point.

Enable Retry Mechanism on Stripe Webhooks

Stripe automatically retries failed webhook events for up to 3 days using exponential backoff. If your server is temporarily unavailable, Stripe will attempt to resend the event later.

Steps to Ensure Reliability:

Always return a 2xx status code after successfully processing the webhook. This tells Stripe the event was processed.
If something goes wrong (e.g., the database save fails), return a non-2xx status code (like 500). Stripe will retry the webhook event.


************* Retry behavior
In live mode, Stripe attempts to deliver a given event to your webhook endpoint for up to 3 days with an exponential back off. In test mode, Stripe retries three times over a few hours. You can view when the next retry will occur in the Events section of the Dashboard.

8. For subscription logic you can use Start Date and End Date and subscriptionStatus in database instead of using stripe subscription base api. 