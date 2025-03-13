const asyncHandler = require('express-async-handler');
const stripe = require('stripe')('sk_test_51R2ByyP0B98VDejvlhWTtXvpwjqh7CbgrVbLWGkgK0zIYmwz4ub242Az0NBKSyAwK4ybPalg2e0xiIcfoFzHr7oa00nf9S8cYn');

// Process a payment
const processPayment = asyncHandler(async (req, res) => {
  const { paymentMethodId, amount, description } = req.body;

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure it's an integer
      currency: 'usd',
      payment_method: paymentMethodId,
      description,
      confirm: true,
      return_url: 'https://yourwebsite.com/donate/success', // Replace with your actual success URL
    });

    res.status(200).json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Create a subscription for recurring donations
const createSubscription = asyncHandler(async (req, res) => {
  const { paymentMethodId, email, amount, description } = req.body;

  try {
    // Create or get customer
    let customer;
    const existingCustomers = await stripe.customers.list({ email });
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ email });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });
    
    // Set as default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create a price (for subscription)
    const price = await stripe.prices.create({
      unit_amount: Math.round(amount * 100),
      currency: 'usd',
      recurring: { interval: 'month' },
      product_data: {
        name: 'Monthly Donation to BNI Foundation',
      },
    });

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      description,
    });

    res.status(200).json({
      success: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = { processPayment, createSubscription };