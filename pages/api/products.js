import db from "../../utils/db"
import Product from "../../models/product"

import products from "../../data/products"

async function handler(req, res, next) {
  await db.connect()

  await Product.deleteMany()

  await Product.insertMany(products)

  res.send({ message: "products added" })
}

export default handler