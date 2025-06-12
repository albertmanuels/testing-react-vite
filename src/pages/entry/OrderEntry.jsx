import { Button } from "react-bootstrap"
import { useOrderDetails } from "../../context/OrderDetails"
import { formatCurrency } from "../../utilities"
import Options from "./Options"

const OrderEntry = ({setOrderPhase}) => {
  const {totals} = useOrderDetails()

  const grandTotal = formatCurrency(totals.scoops + totals.toppings)

  const isButtonDisabled = totals.scoops === 0

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops"/>
      <Options optionType="toppings"/>
      <h2>Grand Total: {grandTotal}</h2>
      <Button disabled={isButtonDisabled} onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  )
}

export default OrderEntry