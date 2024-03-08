import { useParams, Link } from "react-router-dom";
import products from "../data/products";

const ProductDetails = () => {
  const { _id } = useParams();

  const singleProduct = products.find((product) => product._id === _id);
  return (
    <>
      <div>ProductDetails: {singleProduct.name}</div>
      <Link to="/">Back</Link>
    </>
  );
};
export default ProductDetails;
