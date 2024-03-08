import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p3 rounded">
      <Card.Link href={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
        />
      </Card.Link>
      <Card.Body>
        <Card.Link href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Card.Link>
        <Card.Text as="h3">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(product.price)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
export default Product;
