import React, { useState } from "react";
import { Badge, Row } from "reactstrap";
import Countdown from "react-countdown";

const CountdownItem = ({ time, callbackOnCompleted }) => {
  const [timeIsOver, setTimeIsOver] = useState(false);

  const expireItem = () => {
    callbackOnCompleted();
    setTimeIsOver(true);
  };

  return !time ? (
    <></>
  ) : timeIsOver ? (
    <Row className="justify-content-center">
      <Badge color="danger">Time is Over</Badge>
    </Row>
  ) : (
    <div>
      <Row className="justify-content-center">
        <Countdown onComplete={expireItem} date={time} />
      </Row>
      <Row className="justify-content-center">
        <Badge color="danger">Time Remaining</Badge>
      </Row>
    </div>
  );
};

export default CountdownItem;
