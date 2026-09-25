import Image from "next/image"
import { useRouter } from "next/router"

import { useContext } from "react"

import { CartContext } from "../context/Cart"

import Layout from "../components/Layout"

function CartPage() {
  const router = useRouter()

  const { state, dispatch } = useContext(CartContext)
  const { cart: { cartItems } } = state
  const totalPrice = cartItems.reduce((total, current) => total + current.price * current.quantity, 0)

  function removeItemHandler(item) {
    dispatch({ type: "REMOVE_FROM_CART", payload: item })
  }

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">

              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <span className="flex items-center justify-between">
                        <Image src={item.image} width={100} height={100} />
                        {item.title}
                      </span>
                    </td>

                    <td className="p-5 text-right">{item.quantity}</td>

                    <td className="p-5 text-right">${item.price}</td>

                    <td className="p-5 text-center">
                      <button onClick={removeItemHandler.bind(null, item)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <div className="p-5">
            <div className="pb-5">Total Price: ${totalPrice}</div>
            <div>
              <button className="rounded-xl bg-gray-700 text-white px-4 py-2"
                onClick={() => router.push("login?redirect=/shipping")}>
                Checkout
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div>Cart is empty.</div>
      )
      }
    </Layout >
  )
}

export default CartPage