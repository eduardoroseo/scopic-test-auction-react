import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Col, Row } from "reactstrap";
import CardItem from "../../components/CardItem";
import ItemsPagination from "../../components/ItemsPagination";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
      (async () => {
        await api
          .get(`/items?page=${currentPage}`)
          .then(({ data }) => {
            setItems(data.data);
            setPaginationData(data)
          })
          .catch(() => {
            setItems([]);
          });
      })()
  }, [currentPage]);

  const changePage = (page) => {
      setCurrentPage(page);
  }

  return (
    <>
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
      {
        items.length > 0 ?
          <Row className="justify-content-center">
            <ItemsPagination handleChangeCurrentPage={changePage} {...paginationData} />
          </Row> :
          ''
      }
    </>
  );
};

export default HomePage;
