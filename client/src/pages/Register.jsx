import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUserRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/user/authSlice";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [userRegister] = useUserRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await userRegister({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          controlId="email"
          className="my-3">
          <Form.Label>E-mail address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter e-mail address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group
          controlId="name"
          className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group
          controlId="password"
          className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={!showPasswords ? "password" : "text"}
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }></Form.Control>
        </Form.Group>
        <Form.Group
          controlId="confirmPassword"
          className="my-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type={!showPasswords ? "password" : "text"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }></Form.Control>
        </Form.Group>
        <Form.Check
          type="checkbox"
          label={!showPasswords ? "Show passwords" : "Hide passwords"}
          onChange={() => setShowPasswords(!showPasswords)}
        />
        <Button
          type="submit"
          variant="primary"
          className="my-3">
          Register
        </Button>
      </Form>
      <Row className="py-1">
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
export default Register;
