import { getSession } from "next-auth/react"

import db from "../../../utils/db"

import Order from "../../../models/order"


async function handler(req, res) {

  const session = await getSession({ req })

  // check being user and being admin
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Sign in required")
  }

  await db.connect()

  const orders = await Order.find()

  res.send(orders)
}

export default handler