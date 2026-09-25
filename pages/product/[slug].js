import { useRouter } from "next/router"
import Image from "next/image"
import { useContext } from "react"

import { CartContext } from "../../context/Cart"

import Layout from "../../components/Layout"

// import productItems from "../../data/products.json"
import db from "../../utils/db"
import Product from "../../models/product"


function ProductPage({ product }) {
  const router = useRouter()

  // const { query } = useRouter()
  // const { slug } = query
  // const product = productItems.find(item => item.slug === slug)

  if (!product) (<div>Product not found.</div>)

  const { state, dispatch } = useContext(CartContext)

  function addToCartHandler() {
    const existingItem = state.cart.cartItems.find(item => item.slug === product.slug)
    const quantity = existingItem ? existingItem.quantity + 1 : 1
    // add an item to cart
    if (product.count >= quantity) {
      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } })
    } else {
      alert("Product is out.")
    }
    // redirect to cart
    router.push("/cart")
  }

  return (
    <Layout title={product.title}>
      <div className="grid md:grid-cols-4 md:gap-3 bg-white rounded-xl p-10">
        {/* col 1 */}
        <div className="md:cols-span-2">
          <Image
            className="rounded-xl"
            src={product.image}
            width={340}
            height={340}
            layout="responsive"
          />
        </div>
        {/* col 2 */}
        <div className="p-5">
          <div className="text-lg">
            <h2>{product.title}</h2>
            <p>{product.cat}</p>
            <p>{product.description}</p>
          </div>
        </div>
        {/* col 3 */}
        <div className="p-5">
          <div className="flex justify-between mb-2">
            <div>Price:</div>
            <div>${product.price}</div>
          </div>
          <div className="flex justify-between md-2">
            <div>Status:</div>
            <div>{product.count > 0 ? "Available" : "Unavailable"}</div>
          </div>
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-full"
            onClick={addToCartHandler}>Add to Cart</button>
        </div>

      </div>
    </Layout>
  )
}

export default ProductPage


export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()

  const product = await Product.findOne({ slug: slug }).lean()

  return {
    props: { product: product ? db.convertToObject(product) : null }
  }
}