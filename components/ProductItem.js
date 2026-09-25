import Link from "next/link"
import { useRouter } from "next/router"




function ProductItem({ product, addToCart }) {

  return (
    <div className="bg-white rounded-xl mb-5 block">

      <Link href={`/product/${product.slug}`}>
        <img src={product.image} className="rounded-t-xl" />
      </Link>

      <div className="flex flex-col items-center justify-center p-5">

        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.title}</h2>
        </Link>

        <p className="p-2">${product.price}</p>

        <button className="rounded-xl bg-gray-700 text-white px-4 py-2" onClick={addToCart}>
          Add to Cart
        </button>

      </div>

    </div>
  )
}

export default ProductItem