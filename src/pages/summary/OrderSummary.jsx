import { useOrderDetails } from "../../context/OrderDetails"
import { formatCurrency } from "../../utilities"
import SummaryForm from "./SummaryForm"

const OrderSummary = ({setOrderPhase}) => {
  const {totals, optionCounts} = useOrderDetails()

  const scoopArray = Object.entries(optionCounts.scoops)
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>{value} {key}</li>
  ))

  let toppingDisplay = null
  let hasToppings = totals.toppings > 0

  if(hasToppings) {
  const toppingArray = Object.keys(optionCounts.toppings)
  const toppingList = toppingArray.map((key) => (
    <li key={key}>{key}</li>
  ))
    toppingDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    )
  }    

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingDisplay}
      <SummaryForm setOrderPhase={setOrderPhase}/>
    </div>
  )
}

export default OrderSummary