function CheckoutWizard({ activeStep = 0 }) {

  const titles = [
    "User Login",
    "Address",
    "Payment Method",
    "Place Order"]

  return (
    <div className="flex flex-wrap mb-5">
      {titles.map((title, index) => (
        <div key={index} className={`flex-1 border-b-2 text-center 
          ${index <= activeStep ? 'border-blue-600 text-blue-600' : 'border-gray-400 text-gray-400'}`} >
          {title}
        </div>
      ))}
    </div>
  )
}

export default CheckoutWizard