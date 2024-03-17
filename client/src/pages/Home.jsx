import { useGetAllProductsQuery } from "../slices/productsApiSlice";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();

  if (isError)
    return (
      <Message variant="danger">
        {error?.data?.message || error?.error || error}
      </Message>
    );

  if (isLoading) return <Loader />;
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
