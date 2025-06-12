import { Col, Row, Form } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { useState } from "react";

const ScoopOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails()
  const [isValid, setIsValid] = useState(true)

  const handleChange = (e) => {
    const currentValue = e.target.value
    const currentValueFloat = parseFloat(currentValue)

    const valueIsValid = 
    0 <= currentValueFloat && 
    currentValueFloat <= 10 && 
    Math.floor(currentValueFloat) === currentValueFloat

    setIsValid(valueIsValid)

    updateItemCount(name, valueIsValid ? parseInt(currentValue) : 0, "scoops");
  }
 
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            isInvalid={!isValid}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  )
};

export default ScoopOption;
