Important Points of this project Configuration

1.  /api/webhook endpoint will always receive data as express.raw. Always put in above express.json() and below database connection.
2. downlaod the stripe exe from the stripe docs and then save the full path of that downloaded stripe.exe in the system environment file.
If i donot do that then i have write the entire path . example "C:\Users\Sagnik\Downloads\stripe.exe" login. If i set stripe = "C:\Users\Sagnik\Downloads\stripe.exe" then i only have to write stripe.
3. After that C:\Users\Sagnik\Downloads\stripe.exe listen --events payment_intent.created,customer.created,payment_intent.succeeded,checkout.session.completed,payment_intent.payment_failed --forward-to http://localhost:8001/api/webhook. Here the port is forward to my backend server that is running and always set those all events.
4. To configure the hosted website webhook for stripe https://dashboard.stripe.com/test/workbench/webhooks 