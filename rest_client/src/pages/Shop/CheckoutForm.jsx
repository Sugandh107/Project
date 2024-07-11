import React, { useState } from "react";
import Usecart from "../../hooks/Usecart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckoutForm() {
  const [cardError,setCardError]=useState()

  const stripe = useStripe();
  const elements = useElements();
  const [cart, refetch] = Usecart();

  const CartTotal = cart.reduce((total, item) => {
    return total + calculate(item);
  }, 0);
  const Total = CartTotal.toFixed(2);

  function calculate(item) {
    return item.price * item.quantity;
  }

  const handleSubmit =  async(event) => {
    // Block native form submission.
    event.preventDefault();
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      toast.error(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      toast.success("Payment Sucessful")
    }
    }
    
  return (
    <div>
    <div className="py-32 px-8 flex flex-col items-center justify-between gap-8">
      <div className="md:w-1/2 px-4 space-y-7">
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug my-14 mx-14">
          <span className="text-yellow-500">Details </span>
        </h2>
        <div className="w-full flex gap-20">
          <div className="w-1/2 h-52 bg-yellow-500 flex flex-col justify-center  items-center rounded-lg shadow-2xl">
            <div className="space-y-3">
              <h1 className="font-extrabold text-xl">Shopping Details</h1>
              <p className="font-bold">Total Items {cart.length}</p>
              <p className="font-bold">Total Price: Rs.{Total}</p>
            </div>
          </div>
          <div className="md:w-1/2 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 rounded-lg">
            <h4 className="text-lg font-semibold">Process your payment!</h4>
            <h5 className="font-medium">Credit/Debit Card</h5>
            <form onSubmit={handleSubmit} className="space-y-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
                className="w-full px-2 py-2 border border-gray-300 rounded"
              />
              <button type="submit" disabled={!stripe}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-bold">
                Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
  </div>
  
  );
}
export default CheckoutForm;
