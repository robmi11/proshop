import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cart/cartSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormContainer from "../components/FormContainer";

function Shipping() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({ address, city, country, postalCode }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        {/* Shipping address */}
        <Form.Group
          controlId="address"
          className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Enter address"
          />
        </Form.Group>
        {/* Shipping city */}
        <Form.Group
          controlId="city"
          className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter city"
          />
        </Form.Group>
        {/* Shipping postal code */}
        <Form.Group
          controlId="postalCode"
          className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            placeholder="Enter postal code"
          />
        </Form.Group>
        {/* Shipping country */}
        <Form.Group
          controlId="country"
          className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            placeholder="Enter country"
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="btn btn-primary my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default Shipping;
