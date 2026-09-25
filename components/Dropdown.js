import Link from "next/link"

function Dropdown({ href, children, ...rest }) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}

export default Dropdown