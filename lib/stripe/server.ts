import Stripe from "stripe";

// check for secret key
if (!process.env.STRIPE_SECRET_KEY){
    throw new Error('STRIPE_SECRET_KEY is not defined');
}
// throw error if missing

// initialize and export stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-11-17.clover',
});