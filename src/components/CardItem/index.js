import React from 'react';
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const CardItem  = (props) => {
    const { title, description, price } = props;

    return (
        <Card className="mb-3">
            <CardBody className="text-center">
                <CardTitle>
                    <h5>{title}</h5>
                </CardTitle>
                <CardText className="small">{description}</CardText>
                <CardText>{price}$</CardText>
            </CardBody>
        </Card>
    );
}

export default CardItem;