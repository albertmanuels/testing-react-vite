import { useOrderDetails } from "../../context/OrderDetails"
import { formatCurrency } from "../../utilities"
import Options from "./Options"

const OrderEntry = () => {
  const {totals} = useOrderDetails()

  const grandTotal = formatCurrency(totals.scoops + totals.toppings)
  return (
    <div>
      <Options optionType="scoops"/>
      <Options optionType="toppings"/>
      <h2>Grand Total: {grandTotal}</h2>
    </div>
  )
}

export default OrderEntry