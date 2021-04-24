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
import SubmitBidForm from "./SubmitBidForm";

const ItemDetails = () => {
  const { item_id } = useParams();

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!item.id) {
      api
        .get(`items/${item_id}`)
        .then(({ data }) => {
          setItem(data.content);
        })
        .finally(() => setLoading(false));
    }
  }, [item, item_id]);

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <CardHeader>
            <h5>Item Details</h5>
          </CardHeader>
          <CardBody>
            {/* <SweetAlert
              show={feedbackMessage.message !== ""}
              title={feedbackMessage.type === "success" ? "Success" : "Warning"}
              type={
                feedbackMessage.type === "" ? "default" : feedbackMessage.type
              }
              onConfirm={() => setFeedbackMessage(initialFeedBackMessage)}
            >
              {feedbackMessage.message}
            </SweetAlert> */}
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
            <hr />
            <SubmitBidForm item={item} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ItemDetails;
