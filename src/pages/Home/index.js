import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { api } from "../../utils/api";
import { Col, Container, Row } from "reactstrap";
import CardItem from "../../components/CardItem";

const HomePage = () => {
  const { loadingApi } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  // const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    if (!loadingApi) {
      (async () => {
        await api
          .get(`/items?page=${currentPage}`)
          .then(({ data }) => {
            setItems(data.data);
          })
          .catch(() => {
            setItems([]);
          });
        // setPaginationData(data);
      })()
    }
  }, [currentPage, loadingApi]);

  // const changePage = (page) => {
  //     setCurrentPage(page);
  // }

  return (
    <Container className="mt-4">
      <Row>
        {items.map((item) => (
          <Col xs="12" sm="6" md="3" lg="3" key={item.id}>
            <CardItem
              title={item.name}
              description={item.description}
              price={item.price}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
