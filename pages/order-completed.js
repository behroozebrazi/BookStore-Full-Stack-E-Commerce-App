import Link from "next/link"

import Layout from "../components/Layout"


function OrderCompletedPage() {


  return (
    <Layout title="Order Completed">
      <h2 className="mb-10">Thank you for your order!</h2>
      <Link className="rounded-xl bg-gray-700 text-white px-4 py-2" href="/order-history">View Order History</Link>
    </Layout>
  )
}

export default OrderCompletedPage