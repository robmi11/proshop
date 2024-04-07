import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../slices/user/authSlice";
import { useUserLoginMutation } from "../slices/usersApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useUserLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (event) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    event.preventDefault();
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group
          controlId="email"
          className="my-3">
          <Form.Label>E-mail Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter e-mail address..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group
          controlId="password"
          className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }></Form.Control>
        </Form.Group>
        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="my-3">
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default Login;
