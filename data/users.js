import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("11111"),
    isAdmin: true
  },
  {
    name: "User 1",
    email: "email1@email.com",
    password: bcrypt.hashSync("11111"),
    isAdmin: false
  },
  {
    name: "User 2",
    email: "email2@email.com",
    password: bcrypt.hashSync("22222"),
    isAdmin: false
  }
]

export default users