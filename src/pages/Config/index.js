import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Progress,
  Row,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { api } from "../../utils/api";

const initialState = {
  auto_bidding_max_amount: "",
};

const initialFeedBackMessage = {
  message: "",
  type: "",
};

const ConfigPage = () => {
  const [autoBidConfig, setAutoBidConfig] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(
    initialFeedBackMessage
  );
  const [loading, setLoading] = useState(false);

  function onChange(event) {
    const { value, name } = event.target;
    setAutoBidConfig({
      ...autoBidConfig,
      [name]: value,
    });
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { auto_bidding_max_amount } = autoBidConfig;
    setLoading(true);

    api
      .post("auto-bid-config", {
        auto_bidding_max_amount,
      })
      .then(({ data }) => {
        setAutoBidConfig(data.content);
        setErrors([]);
        setFeedbackMessage({
          message: "Configuration saved with success!",
          type: "success",
        });
      })
      .catch(({ data }) => {
        setErrors(data.errors);
        setFeedbackMessage({
          message: data.message,
          type: "danger",
        });
      })
      .finally(() => setLoading(false));
  }

  async function disable(event) {
    event.preventDefault();

    setLoading(true);

    api
      .delete("auto-bid-config")
      .then(() => {
        setAutoBidConfig(initialState);
        setErrors([]);
        setFeedbackMessage({
          message: "Configuration disabled with success!",
          type: "success",
        });
      })
      .catch(({ data }) => {
        setErrors(data.errors);
        setFeedbackMessage({
          message: data.message,
          type: "danger",
        });
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    (async () => {
      if (autoBidConfig.auto_bidding_max_amount === "") {
        setLoading(true);
        await api.get("/auto-bid-config").then(({ data, status }) => {
          setAutoBidConfig(status === 204 ? initialState : data.content);
        });
        setLoading(false);
      }
    })();
  }, [autoBidConfig]);

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <CardHeader>
            <h5>Auto-bid Configuration</h5>
          </CardHeader>
          <CardBody>
            <SweetAlert
              show={feedbackMessage.message !== ""}
              title={feedbackMessage.type === "success" ? "Success" : "Warning"}
              type={
                feedbackMessage.type === "" ? "default" : feedbackMessage.type
              }
              onConfirm={() => setFeedbackMessage(initialFeedBackMessage)}
            >
              {feedbackMessage.message}
            </SweetAlert>
            <Progress
              bar
              animated
              color="secondary"
              value="100"
              hidden={!loading}
            >
              Loading ...
            </Progress>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="auto_bidding_max_amount">
                  Auto Bidding Max Amount
                </Label>
                <Input
                  type="number"
                  name="auto_bidding_max_amount"
                  id="auto_bidding_max_amount"
                  onChange={onChange}
                  value={autoBidConfig.auto_bidding_max_amount}
                  invalid={errors["auto_bidding_max_amount"] !== undefined}
                />
                {errors["auto_bidding_max_amount"] !== undefined
                  ? errors["auto_bidding_max_amount"].map((message, key) => (
                      <FormFeedback key={key}>{message}</FormFeedback>
                    ))
                  : ""}
              </FormGroup>
              <Row form>
                <Col xs={8}>
                  <Button color="info" className="btn-block">
                    Save
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button
                    color="danger"
                    onClick={disable}
                    className="btn-block"
                    disabled={!(autoBidConfig.auto_bidding_max_amount !== "")}
                  >
                    Disable
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ConfigPage;
