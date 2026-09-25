import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { useContext } from "react"

import { CartContext } from "../context/Cart"

import Layout from "../components/Layout"
import CheckoutWizard from "../components/CheckoutWizard"


function PlaceOrderPage() {
  const router = useRouter()
  const { state, dispatch } = useContext(CartContext)
  const { cart } = state
  const { shippingData, paymentMethod, cartItems } = cart

  const showShippingData = `${shippingData.name} - ${shippingData.address} - ${shippingData.postalCode}`

  const showCartItems = cartItems.map((item) => (
    <tr key={item._id} className="border-b">
      <td>
        <div className="flex items-center">
          <Image src={item.image} width={50} height={50} />
          &nbsp;
          {item.title}
        </div>
      </td>
      <td className="p-5 text-right">{item.quantity}</td>
      <td className="p-5 text-right">${item.price}</td>
      <td className="p-5 text-right">${item.quantity * item.price}</td>
    </tr>
  ))

  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)

  async function placeOrderHandler() {

    const newOrder = {
      orderItems: cartItems,
      shippingData: shippingData,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder)
    })

    const data = await response.json()

    dispatch({ type: "DELETE_CART" })

    router.push("/order-completed")
  }


  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>

      <div className="grid md:grid-cols-4 md:gap-5">

        <div className="overflow-x-auto md:col-span-3">
          {/* Shipping Data */}
          <div className="p-5">
            <h2 className="mb-2 text-lg">Shipping Data</h2>
            <div>{showShippingData}</div>
            <div> <Link href="/shipping" >Edit</Link> </div>
          </div>
          {/* Payment Method */}
          <div className="p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <div>{paymentMethod}</div>
            <div> <Link href="/payment" >Edit</Link> </div>
          </div>
          {/* Order Items */}
          <div className="p-5 overflow-x-auto">
            <h2 className="mb-5 text-lg">Order Items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>{showCartItems}</tbody>
            </table>
            <div> <Link href="/cart" >Edit</Link> </div>
          </div>
        </div>

        <div className="p-5">
          <h2 className="mb-2 text-lg">Order Summery</h2>
          <ul>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Total Price</div>
                <div>${totalPrice}</div>
              </div>
            </li>
            <li>
              <button className="rounded-xl bg-gray-700 text-white px-4 py-2" onClick={placeOrderHandler}>Place Order</button>
            </li>
          </ul>
        </div>

      </div>
    </Layout>
  )
}

export default PlaceOrderPage