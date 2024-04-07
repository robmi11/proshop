import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          xs={12}
          md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
export default FormContainer;
