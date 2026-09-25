import db from "../../utils/db"
import User from "../../models/user"

import users from "../../data/users"

async function handler(req, res, next) {
  await db.connect()

  await User.deleteMany()

  await User.insertMany(users)

  res.send({ message: "users added" })
}

export default handler