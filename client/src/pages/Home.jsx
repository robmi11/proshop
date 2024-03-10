import { useGetAllProductsQuery } from "../slices/productsApiSlice";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();

  if (isError)
    return (
      <>
        <h1>Something went wrong!</h1>
        <p>{error?.data?.message || error.error}</p>
      </>
    );

  if (isLoading) return <h1>Loading...</h1>;
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
