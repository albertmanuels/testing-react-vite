import { useState } from "react"
import { Form, Button, OverlayTrigger } from "react-bootstrap"
import { Popover } from "react-bootstrap"

const SummaryForm = ({setOrderPhase}) => {
  const [tcChecked, setTcChecked] = useState(false)

  function handleSubmit(e){
    e.preventDefault()

    setOrderPhase("completed")
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )

  const checkboxlabel = (
    <span>
      I agree to 
      <OverlayTrigger placement="right" overlay={popover}>
      <span style={{color: "blue"}}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check 
          type="checkbox" 
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)} 
          label={checkboxlabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>Confirm Order</Button>
    </Form>
  )
}

export default SummaryForm