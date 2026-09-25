// ALWAYS render on CLIENT side. PUSH rendering on CLIENT side.
import dynamic from "next/dynamic"
import Head from "next/head"
import Link from "next/link"

import { useContext, useState, useEffect } from "react"

import { useSession, signOut } from "next-auth/react"

// Show notifications
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Delete cookie
import Cookies from "js-cookie"

import { Menu } from "@headlessui/react"

import { CartContext } from "../context/Cart"

import Dropdown from "./Dropdown"


function Layout({ title, children }) {
  const { status, data: session } = useSession()

  const { state, dispatch } = useContext(CartContext)
  const { cart } = state

  const [cartItemsCount, setCartItemsCount] = useState(0)
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((total, current) => total + current.quantity, 0))
  }, [cart.cartItems])

  // Logout operation -> delete cookie, sign out
  function logoutHandler() {
    Cookies.remove()
    signOut({ callbackUrl: "/login" })
  }


  return (
    <>
      <Head>
        <title>{`${title} - Shopping`}</title>
      </Head>

      {/* notifications */}
      <ToastContainer position="bottom-center" limit={2} autoClose={2000} closeOnClick={true} pauseOnHover={true} closeButton={false} />

      <div className="flex min-h-screen flex-col justify-between">

        {/* header */}
        <header>
          <nav className="flex h-14 px-8 justify-between items-center border-b-3 bg-white">

            {/* left side */}
            <Link href="/" className="text-lg font-bold">Shopping</Link>

            {/* right side */}
            <div>

              {/* cart */}
              <Link href="/cart" className="p-2">
                Cart
                <span className="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">
                  {cartItemsCount}
                </span>
              </Link>

              {/* login */}
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                // session.user.name
                <Menu as="div" className="reletive inline-block">
                  <Menu.Button className="text-blue-500">
                    {session.user.name}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 w-56 bg-white rounded-xl p-4 origin-top-right border-w border-slate-100">

                    {/* Admin Dashboard */}
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <Dropdown className="flex p-2" href="/admin/dashboard">Admin Dashboard</Dropdown>
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      <Dropdown className="flex p-2" href="/order-history">Order History</Dropdown>
                    </Menu.Item>

                    <Menu.Item>
                      <a className="flex p-2" href="#" onClick={logoutHandler}>Logout</a>
                    </Menu.Item>

                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">Login</Link>
              )}
            </div>
          </nav>
        </header>

        {/* body */}
        <main className="container m-auto mt-4 px-4">
          {children}
        </main>

        {/* footer */}
        <footer className="flex justify-center items-center h-10">
          Footer
        </footer>

      </div>
    </>
  )
}

// export default Layout
// ALWAYS render on CLIENT side. PUSH rendering on CLIENT side.
export default dynamic(() => Promise.resolve(Layout), { ssr: false })