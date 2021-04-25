import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Progress,
  Row,
} from "reactstrap";
import { api } from "../../utils/api";
import CountdownItem from "./CountdownItem";
import Holder from "./Holder";
import SubmitBidForm from "./SubmitBidForm";

const ItemDetails = () => {
  const { item_id } = useParams();

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  const [disableFields, setDisableFields] = useState(false);

  const getItemData = () => {
    api
      .get(`items/${item_id}`)
      .then(({ data }) => {
        setItem(data.content);
      })
      .finally(() => setLoading(false));
  };

  useEffect(getItemData, [item_id]);

  const onItemExpiration = () => {
    setDisableFields(true);
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <CardHeader>
            <h5>Item Details</h5>
          </CardHeader>
          <CardBody>
            <Progress
              bar
              animated
              color="secondary"
              value="100"
              hidden={!loading}
            >
              Loading ...
            </Progress>
            <CardTitle>
              <Row className="justify-content-center">
                <h5>{item.name}</h5>
              </Row>
            </CardTitle>
            <CardText>
              <b>Description:</b>
            </CardText>
            <CardText>{item.description}</CardText>
            <CountdownItem
              callbackOnCompleted={onItemExpiration}
              time={item.bid_expiration}
            />
            <Holder holder={item.buyer} />
            <hr />
            <SubmitBidForm refreshItemData={getItemData} item={item} disableFields={disableFields} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ItemDetails;
