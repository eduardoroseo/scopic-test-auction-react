import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { api } from "../../utils/api";
import { useAuth } from "../../contexts/auth";

function initialState() {
  return { email: "user@scopic-auction.com", password: "password" };
}

const LoginPage = () => {
  const { saveAuthToken } = useAuth();
  const [values, setValues] = useState(initialState());
  const [invalid, setInvalid] = useState(false);

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { email, password } = values;

    api
      .post("login", {
        email,
        password,
      })
      .then(({ data }) => {
        saveAuthToken(data);
      })
      .catch(() => {
        setInvalid(true);
      });
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={8} lg={6}>
          <h1 className="mt-5">Auction - Antique Items</h1>
          <Card>
            <CardBody>
              <Form autoComplete="nope" onSubmit={onSubmit} className="mt-4">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      onChange={onChange}
                      defaultValue={values.email}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-key"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      invalid={invalid}
                      type="password"
                      id="password"
                      name="password"
                      onChange={onChange}
                      defaultValue={values.password}
                    />
                    <FormFeedback>
                      Oh noes! User or password is invalid!
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
                <FormGroup check>
                  <Col>
                    <Button className="btn-block">Sign In</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
