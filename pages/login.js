import Link from "next/link"
import { useRouter } from "next/router"

import { useEffect } from "react"

// Validation form hook
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"

import Layout from "../components/Layout"

function LoginPage() {

  // handle session
  // redirect to Non Login page if the SESSION exist
  const router = useRouter()
  const { redirect } = router.query
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirect || "/")
    }
  }, [status, router, redirect])

  // handle form submition
  const { register, handleSubmit, formState: { errors }, } = useForm()

  // Sign in function
  async function submitHandler({ email, password }) {
    try {
      const result = await signIn("credentials", { redirect: false, email, password })
      if (result.error) { console.log(result.error) }
    } catch (error) {
      console.log("Sign in error: ", error)
    }
  }

  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>

        <h2 className="mb-4 text-xl">Login</h2>

        {/* username */}
        <div className="mb-4">
          <input className="w-full rounded-xl p-2 outline-1"
            type="email"
            id="email"
            placeholder="Email"
            autoFocus
            {...register("email", { required: true })} />
          {errors.email && (<div className="text-red-500">Please enter your email</div>)}
        </div>

        {/* password */}
        <div className="mb-4">
          <input className="w-full rounded-xl p-2 outline-1"
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: { value: 5, message: "Password must be at least 5 chars" } })} />
          {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
        </div>

        {/* login button */}
        <div className="mb-4">
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28" type="submit">Login</button>
        </div>

        {/* register */}
        <div className="mb-4">
          <Link href="register">Register</Link>
        </div>

      </form>
    </Layout>
  )
}

export default LoginPage