import { useContext } from "react"

// Show notifications
import { toast } from "react-toastify"

import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"

import { CartContext } from "../context/Cart"

// import productItems from "../data/products"
import db from "../utils/db"
import Product from "../models/product"

function HomePage({ products }) {

  const { state, dispatch } = useContext(CartContext)

  function addToCartHandler(product) {
    const existingItem = state.cart.cartItems.find(item => item.slug === product.slug)
    const quantity = existingItem ? existingItem.quantity + 1 : 1
    // add an item to cart
    if (product.count >= quantity) {
      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } })
      toast.success("Product added")
    } else {
      toast.warning("Product is out.")
    }
  }

  // const productList = productItems.map(item => <ProductItem item={item} key={item.slug}></ProductItem>)
  const productList = products.map(item => <ProductItem product={item} key={item.slug} addToCart={addToCartHandler.bind(null, item)}></ProductItem>)


  return (
    <Layout title='Home Page'>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {productList}
      </div>
    </Layout>
  )
}

export default HomePage


export async function getServerSideProps() {
  await db.connect()

  const products = await Product.find().lean()

  return {
    props: { products: products.map(db.convertToObject) }
  }
}