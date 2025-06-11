import { Col, Form, Row } from "react-bootstrap"
import { useOrderDetails } from "../../context/OrderDetails"

const ToppingOption = ({imagePath, name}) => {
  const {updateItemCount} = useOrderDetails()

  const handleChange = (e) => {
    const value = e.target.checked ? 1 : 0
    updateItemCount(name, parseInt(value), "toppings" )
  }

  return (
   <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: "center"}}>
      <img src={`http://localhost:3030${imagePath}`} alt={`${name} topping`} style={{width: "75%"}}/>
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
      >
        <Col xs="5" style={{ textAlign: "center" }}>
          <Form.Control
            name={name}
            type="checkbox"
            onChange={handleChange}
          />
          <Form.Label>
            {name}
          </Form.Label>
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ToppingOption