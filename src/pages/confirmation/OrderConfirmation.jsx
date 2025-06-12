import { useEffect, useState } from "react"
import { useOrderDetails } from "../../context/OrderDetails"
import axios from "axios"
import { Button } from "react-bootstrap"
import AlertBanner from "../common/AlertBanner"


const OrderConfirmation = ({setOrderPhase}) => {
  const {resetOrder}  = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.post("http://localhost:3030/order")
    .then(response => setOrderNumber(response.data.orderNumber))
    .catch(() => setError(true))
  }, [])

  const newOrderButton =  <Button onClick={handleClick}>Create new order</Button>

  if(error) {
    return (
    <>
      <AlertBanner/>
      {newOrderButton}
    </>
    )
  }

  function handleClick() {
    resetOrder()
    setOrderPhase("inProgress")
  }

  if(orderNumber) {
    return (
      <div style={{textAlign: "center"}}>
        <h1>Thank You!</h1>
        <p>Your order number is: {orderNumber}</p>
        <p style={{fontSize: "25%"}}>as per our terms and conditions, nothing will happen now</p>
        {newOrderButton}
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default OrderConfirmation