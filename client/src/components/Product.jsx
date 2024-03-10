import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  // console.log(product[0]);
  return (
    <Card className="my-3 p3 rounded">
      <LinkContainer to={`/product/${product._id}`}>
        <Card.Link>
          <Card.Img
            src={product.image}
            variant="top"
          />
        </Card.Link>
      </LinkContainer>
      <Card.Body>
        <LinkContainer to={`/product/${product._id}`}>
          <Card.Link>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Card.Link>
        </LinkContainer>
        <Card.Text as="h3">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </Card.Text>
        <Rating
          text={`${product.numReviews} ${
            product.numReviews === 1 ? "Review" : "Reviews"
          }`}
          value={product.rating}
        />
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
export default Product;
