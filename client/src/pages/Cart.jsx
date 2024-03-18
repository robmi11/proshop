import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, removeFromCart } from "../slices/cart/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Message from "../components/Message";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const updateItemQuantity = (_id, qty) => {
    dispatch(updateItem({ _id, qty }));
    navigate("/cart");
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Row>
        <Col
          md={8}
          className="mb-3">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              <p>Your cart is empty</p>
              <Link
                style={{
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                className="d-flex align-items-center"
                to="/">
                <FaShoppingCart />{" "}
                <span className=" d-block ms-2">Continue Shopping</span>
              </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price)}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(event) =>
                          updateItemQuantity(
                            item._id,
                            Number(event.target.value),
                          )
                        }>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            value={x + 1}
                            key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="ligh"
                        onClick={() => dispatch(removeFromCart(item._id))}>
                        <FaTrash color="black" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  ) items
                </h2>
                {cartItems.length !== 0 &&
                  Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(cart.totalPrice)}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid">
                <Button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={() => checkOutHandler()}>
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Cart;
