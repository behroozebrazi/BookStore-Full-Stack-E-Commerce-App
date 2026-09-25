import { useRouter } from "next/router"

import { useContext, useEffect } from "react"
import { CartContext } from "../context/Cart"

import Cookies from "js-cookie"
import { useForm } from "react-hook-form"

import Layout from "../components/Layout"
import CheckoutWizard from "../components/CheckoutWizard"


function Shipping() {
  // reload value in the form's inputs after refreshing page
  const { handleSubmit, setValue, register } = useForm()

  const router = useRouter()

  const { state, dispatch } = useContext(CartContext)
  const { cart } = state
  const { shippingData } = cart

  // reload value in the form's inputs after refreshing page
  useEffect(() => {
    setValue("name", shippingData.name)
    setValue("address", shippingData.address)
    setValue("postalCode", shippingData.postalCode)
  }, [setValue, shippingData.name, shippingData.address, shippingData.postalCode])

  function submitHandler({ name, address, postalCode }) {
    // save in context
    dispatch({ type: "SAVE_SHIPPING_DATA", payload: { name, address, postalCode } })
    // save in cookie
    Cookies.set("cart", JSON.stringify({ ...cart, shippingData: { name, address, postalCode } }))
    // redirect to Payment Method page
    router.push("/payment")
  }

  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />

      {/* form */}
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="mb-4 text-xl">Shipping</h2>
        <div className="mb-4">
          <input className="w-full rounded-xl p-2 mb-2 outline-0 bg-white" autoFocus placeholder="Name"
            id="name" {...register("name")} />
          <input className="w-full rounded-xl p-2 mb-2 outline-0 bg-white" autoFocus placeholder="Address"
            id="address" {...register("address")} />
          <input className="w-full rounded-xl p-2 mb-2 outline-0 bg-white" autoFocus placeholder="Postal Code"
            id="postalCode" {...register("postalCode")} />
          <div className="mb-4">
            <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">Next</button>
          </div>
        </div>
      </form>

    </Layout>
  )
}

Shipping.auth = true

export default Shipping