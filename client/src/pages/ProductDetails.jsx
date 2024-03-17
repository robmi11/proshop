import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cart/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import Rating from "../components/Rating";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const {
    data: singleProduct,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(_id);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...singleProduct, qty }));
    navigate("/cart");
  };

  if (isError) return <h1>{error?.data?.message || error.error}</h1>;
  if (isLoading) return <Loader />;

  return (
    <>
      <Link
        to="/"
        className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image
            src={singleProduct.image}
            alt={singleProduct.name}
            fluid
          />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{singleProduct.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={singleProduct.numReviews}
                text={`${singleProduct.numReviews} ${
                  singleProduct.numReviews === 1 ? "Review" : "Reviews"
                }`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4>Description:</h4>
                </Col>
              </Row>
              <Row>
                <Col>{singleProduct.description}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(singleProduct.price)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {singleProduct.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* qty selector */}
                {singleProduct.countInStock > 0 && (
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(event) =>
                          setQty(Number(event.target.value))
                        }>
                        {[...Array(singleProduct.countInStock).keys()].map(
                          (x) => (
                            <option
                              value={x + 1}
                              key={x + 1}>
                              {x + 1}
                            </option>
                          ),
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid">
                <Button
                  onClick={addToCartHandler}
                  disabled={singleProduct.countInStock === 0}
                  type="button">
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ProductDetails;
