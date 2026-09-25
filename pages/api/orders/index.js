import { getSession } from "next-auth/react"
import { getToken } from "next-auth/jwt"

import db from "../../../utils/db"
import Order from "../../../models/order"


async function handler(req, res) {
  // read current user's info from session in the cookie
  // const session = await getSession({ req })
  // if (!session) {
  //   return res.json({ message: "Sign in required" })
  // }
  // const { user } = session

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return res.json({ message: "Sign in required" })
  }

  // ceate a new document
  const newOrder = new Order({
    ...req.body,
    user: token._id
  })

  // record the doc in the MongoDB
  await db.connect()

  // save document
  const order = await newOrder.save()

  res.status(201).send(order)
}

export default handler