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
import CurrencyInput from "../../../components/layouts/CurrencyInput";

const SubmitBidForm = ({ item, disableFields = false }) => {
  const [bidPrice, setBidPrice] = useState(null);

  useEffect(() => {
    setBidPrice(item.price || null);
  }, [item]);

  const changeInputBidPrice = (event) => {
    const { value } = event.target;

    const bidPrice = value.replace("$", "").replace(",", "");

    setTreatedBidPrice(parseFloat(bidPrice));
  };

  const setTreatedBidPrice = (price) => {
    const newPrice = price <= item.price ? item.price : price;
    setBidPrice(newPrice);
  };

  return (
    <>
      <FormGroup row>
        <Label for="bid_price" sm={3}>
          Bid Price
        </Label>
        <Col sm={9}>
          <InputGroup>
            <CurrencyInput
              value={bidPrice}
              className="form-control"
              name="bid_price"
              onChange={changeInputBidPrice}
              disabled={disableFields}
              required
            />
            <InputGroupAddon addonType="append">
              <Button
                size="sm"
                color="success"
                disabled={disableFields}
                onClick={() => setBidPrice(bidPrice + 1)}
              >
                <i className="fa fa-plus"></i>
              </Button>
            </InputGroupAddon>
            <InputGroupAddon addonType="append">
              <Button
                size="sm"
                color="danger"
                disabled={disableFields}
                onClick={() => setTreatedBidPrice(bidPrice - 1)}
              >
                <i className="fa fa-minus"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input disabled={disableFields} type="checkbox" /> Enable Auto-bidding
        </Label>
      </FormGroup>
      <br />
      <CardText>
        <Button disabled={disableFields} size="sm">Submit Bid</Button>
      </CardText>
    </>
  );
};

export default SubmitBidForm;
