import React from "react";
import { useHistory } from "react-router";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";

const CardItem = (props) => {
  const history = useHistory();

  const { id, title, description, price } = props;

  const openDetails = () => {
    history.push(`/itemDetails/${id}`);
  };

  return (
    <Card className="mb-3">
      <CardBody className="text-center">
        <CardTitle>
          <h5>{title}</h5>
        </CardTitle>
        <CardText className="small">{description}</CardText>
        <CardText>${price}</CardText>
        <CardText>
          <Button onClick={openDetails} size="sm">
            Bid Now <i className="fa fa-shopping-cart"></i>
          </Button>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default CardItem;
