import type { AppProps } from 'next/app'
// Global variables management
import { CartContextProvider } from "../context/Cart"
// Session management
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
// Global styles
import '../styles/globals.css'


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <div className='bg-gray-300'>
      <SessionProvider session={session}>
        <CartContextProvider>

          {/* Check user login by Component.auth -> True */}
          {/* auth = true / false */}
          {Component.auth ? (
            // Check admin login by adminOnly={Component.auth.adminOnly} -> True
            <Auth adminOnly={Component.auth.adminOnly}>
              {/* Login users */}
              <Component {...pageProps} />
            </Auth>
          ) : (
            // Not Login users
            <Component {...pageProps} />
          )}

        </CartContextProvider>
      </SessionProvider>
    </div>
  )
}


// Login users
function Auth({ children, adminOnly }) {
  const router = useRouter()

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() { router.push("/unauthorized") }
  })

  // Check not login
  if (status === "loading") {
    return "Loading"
  }

  // Check admin login
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized")
  }

  // Check user login
  return children
}


export default MyApp