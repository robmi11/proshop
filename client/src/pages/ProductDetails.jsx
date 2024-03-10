import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import Rating from "../components/Rating";

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [isError, setIsError] = useState(false);
  const { _id } = useParams();

  useEffect(() => {
    const fetchSingleProductById = async () => {
      try {
        const { data } = await axios.get(`/api/products/${_id}`);
        console.log(data);
        setSingleProduct(data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchSingleProductById();
  }, [_id]);

  if (isError) return <h1>Something went realy bad....</h1>;

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
              <ListGroup.Item className="d-grid">
                <Button
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
