import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(shippingAddress) === "{}") {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps
        step1
        step2
        step3
      />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="PayPap"
              name="paymentMethod"
              value={paymentMethod}
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default Payment;
