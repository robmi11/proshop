import Conatiner from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Footer = () => {
  return (
    <footer>
      <Conatiner>
        <Row>
          <Col className="text-center py-3">
            <p>Copyright ProShop &copy; {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Conatiner>
    </footer>
  );
};
export default Footer;
