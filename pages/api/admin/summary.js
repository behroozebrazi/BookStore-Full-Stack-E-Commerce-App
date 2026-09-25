import { getSession } from "next-auth/react"

import db from "../../../utils/db"

import User from "../../../models/user"
import Product from "../../../models/product"
import Order from "../../../models/order"


async function handler(req, res) {

  const session = await getSession({ req })

  // check being user and being admin
  if (!session || (session && !session.user.isAdmin)) {
    return res.send("Sign in required")
  }

  await db.connect()

  // number of users (documents)
  const usersCount = await User.countDocuments()
  // number of products (documents)
  const productsCount = await Product.countDocuments()
  // number of orders (documents)
  const ordersCount = await Order.countDocuments()

  res.send([{ usersCount, productsCount, ordersCount }])
}

export default handler