import CardItem from "components/Item/CardItem";
import StoreContext from "components/Store/Context";
import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import api from "utils/api";

const HomePage = () => {
  const { loadingApi } = useContext(StoreContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!loadingApi) {
      (async () => {
        const {
          data: { data },
        } = await api.get("/items");

        setItems(data);
      })();
    }
  }, [loadingApi]);

  return (
    <Container className="mt-4">
      <Row>
        {items.map((item) => (
          <Col xs="12" sm="6" md="3" lg="3">
            <CardItem
              title={item.name}
              description={item.description}
              price={item.price}
            />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href="#" />
          </PaginationItem>
        </Pagination>
      </Row>
    </Container>
  );
};

export { HomePage };
