import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PagEySCLk0NHLSaZzLduayEOueKAR2unemzLIGYMJhLo8dIEd4fDYsYMaY8nlI23xhHflUhRvMPe3UI39Fu26WJ006YAAkS4k"
);
console.log(stripePromise);
function Payment() {
  return (
    <div >
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;
