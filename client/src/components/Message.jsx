import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

Message.defaultProps = {
  variant: "primary",
};

Message.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]),
  children: PropTypes.node.isRequired,
};
export default Message;
