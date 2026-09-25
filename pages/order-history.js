import { useState, useEffect } from "react"

import Layout from "../components/Layout"


function OrderHistoryPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch("api/orders/history")
      const data = await response.json()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  const orderList = orders.map((item) => (
    <div key={item.id} className="flex p-2">
      <div className="px-2">Order ID: {item._id} - </div>
      <div className="px-2">Total Price: ${item.totalPrice}</div>
    </div>
  ))

  return (
    <Layout title="Order History">
      <h2 className="text-lg">Order History</h2>
      <div>{orderList}</div>
    </Layout>
  )
}

export default OrderHistoryPage