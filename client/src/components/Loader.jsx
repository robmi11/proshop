import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        margin: "auto",
        display: "block",
      }}></Spinner>
  );
};
export default Loader;
