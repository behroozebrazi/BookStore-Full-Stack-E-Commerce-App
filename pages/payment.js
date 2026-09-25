import { useRouter } from "next/router";
import { useState, useContext } from "react";
import Cookies from "js-cookie";

import { CartContext } from "../context/Cart";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";


function Payment() {
  const router = useRouter()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  const { state, dispatch } = useContext(CartContext)
  const { cart } = state
  const { paymentMethod } = cart

  // payment methods
  const methods = ["Gateway", "Offline Payment"]

  function submitHandler(event) {
    event.preventDefault()
    if (!selectedPaymentMethod) {
      alert("Please select a payment method")
    } else {
      // save in context
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod })
      // save in cookie
      Cookies.set("cart", JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod }))
      // redirect to Place Order page
      router.push("/placeorder")
    }
  }

  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2} />

      {/* form */}
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h2 className="mb-4 text-xl">Payment Method</h2>
        {/* radio */}
        {methods.map((item) => (
          <div key={item} className="mb-4" >
            <input name="paymenyMethod" className="p-2 outline-none focus:ring-0" type="radio" id={item}
              checked={item === selectedPaymentMethod}
              onChange={() => setSelectedPaymentMethod(item)} />
            <label className="p-2" htmlFor={item}>{item}</label>
          </div>
        ))}
        {/* button */}
        <div className="mb-4 flex justify-between">
          <button className="rounded-xl bg-gray-400 text-gray-700 px-4 py-2 w-28"
            onClick={() => router.push("/shipping")} type="button">Back</button>
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28" type="submit">Next</button>
        </div>

      </form>

    </Layout>
  )
}

export default Payment