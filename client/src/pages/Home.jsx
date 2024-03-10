import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setIsError(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };

    fetchProducts();
  }, []);

  if (isError) return <h1>Something went really wrong</h1>;

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Home;
