import React, { useEffect, useState } from "react";
import {
  Button,
  CardText,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
} from "reactstrap";
import FeedbackMessage from "../../../components/FeedbackMessage";
import CurrencyInput from "../../../components/layouts/CurrencyInput";
import { api } from "../../../utils/api";

const SubmitBidForm = ({ refreshItemData, item, disableFields = false }) => {
  const [bidPrice, setBidPrice] = useState(null);
  const [enableAutoBid, setEnableAutoBid] = useState(false);
  const [loadingBid, setLoadingBid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [feedback, setFeedback] = useState({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    setBidPrice(item.price || null);
  }, [item]);

  const changeInputBidPrice = (event) => {
    const { value } = event.target;

    const bidPrice = value.replace("$", "").replace(",", "");

    setTreatedBidPrice(parseFloat(bidPrice || 0));
  };

  const setTreatedBidPrice = (price) => {
    const newPrice = price <= item.price ? item.price : price;
    setBidPrice(newPrice);
  };

  const handleAutoBidding = (event) => {
    const { checked } = event.target;
    setEnableAutoBid(checked);
  };

  const handleDisabled = () => disableFields || loadingBid || !bidPrice;

  const handleBid = () => {
    setLoadingBid(true);

    api
      .post(`items/${item.id}/bid`, {
        bid_price: bidPrice,
        auto_bidding: enableAutoBid,
      })
      .then(() => {
        setErrors([]);
        setFeedback({ message: "Bid Accepted", type: "success", show: true });
      })
      .catch(({ data: { errors, message } }) => {
        setErrors(errors);
        setFeedback({ message, type: "danger", show: true });
      })
      .finally(() => {
        refreshItemData();
        setLoadingBid(false);
      });
  };

  return (
    <>
      <FeedbackMessage
        message={feedback.message}
        type={feedback.type}
        onConfirm={() => setFeedback({ ...feedback, show: false })}
        show={feedback.show}
      />
      <FormGroup row>
        <Label for="bid_price" sm={3}>
          Bid Price
        </Label>
        <Col sm={9}>
          <InputGroup>
            <CurrencyInput
              value={bidPrice}
              className={
                "form-control " + (errors["bid_price"] ? "is-invalid" : "")
              }
              aria-invalid={errors["bid_price"] !== undefined}
              name="bid_price"
              onChange={changeInputBidPrice}
              disabled={handleDisabled()}
              required
            />
            <InputGroupAddon addonType="append">
              <Button
                size="sm"
                color="success"
                disabled={handleDisabled()}
                onClick={() => setBidPrice(bidPrice + 1)}
              >
                <i className="fa fa-plus"></i>
              </Button>
            </InputGroupAddon>
            <InputGroupAddon addonType="append">
              <Button
                size="sm"
                color="danger"
                disabled={handleDisabled()}
                onClick={() => setTreatedBidPrice(bidPrice - 1)}
              >
                <i className="fa fa-minus"></i>
              </Button>
            </InputGroupAddon>
            {errors["bid_price"] !== undefined
              ? errors["bid_price"].map((message, key) => (
                  <div className="invalid-feedback" key={key}>
                    {message}
                  </div>
                ))
              : ""}
          </InputGroup>
        </Col>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            disabled={handleDisabled()}
            onChange={handleAutoBidding}
            type="checkbox"
          />{" "}
          Enable Auto-bidding
        </Label>
      </FormGroup>
      <br />
      <CardText>
        <Button onClick={handleBid} disabled={handleDisabled()} size="sm">
          Submit Bid
        </Button>
      </CardText>
    </>
  );
};

export default SubmitBidForm;
