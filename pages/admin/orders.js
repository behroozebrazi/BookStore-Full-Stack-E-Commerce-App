import Link from "next/link"

import { useState, useEffect } from "react"

import Layout from "../../components/Layout"

function Orders() {
  const [adminOrders, setAdminOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/admin/orders")
      const data = await response.json()
      setAdminOrders(data)
    }
    fetchData()
  }, [])


  return (
    <Layout title="Admin Orders">
      <div className="grid md:grid-cols-4 md:gap-5">

        {/* 1st column */}
        <div>
          <ul className="space-y-2">
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link className="font-bold" href="/admin/orders">Orders</Link>
            </li>
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link href="/admin/products">Products</Link>
            </li>
            <li className="w-1/2 p-2 m-2 bg-white rounded-md">
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>

        {/* 2nd 3rd 4th columns */}
        <div className="md:col-span-3">
          <h2 className="mb-4 text-xl">Admin Orders</h2>
          {adminOrders.map((item, index) => (
            <div key={index} className="grid grid-cols-4">
              <div className="m-2 p-2 bg-white rounded-md">
                <p>Price: ${item.totalPrice}</p>
              </div>
              <div className="m-2 p-2 bg-white rounded-md">
                <p>Payment Method: {item.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout >
  )
}

Orders.auth = { adminOnly: true }

export default Orders