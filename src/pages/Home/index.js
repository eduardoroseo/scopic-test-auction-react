import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Col, Row, Spinner } from "reactstrap";
import CardItem from "../../components/CardItem";
import ItemsPagination from "../../components/ItemsPagination";
import Filter from "./Filter";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [searchFilter, setSearchFilter] = useState(undefined);
  const [sortFilter, setSortFilter] = useState(null);
  const [paginationData, setPaginationData] = useState({});
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    setLoadingList(true);
    (async () => {
      const search = searchFilter ? `&search=${searchFilter}` : "";
      const sort = sortFilter ? `&orderByPrice=${sortFilter}` : "";

      await api
        .get(`/items?page=${currentPage}${search}${sort}`)
        .then(({ data }) => {
          setItems(data.data);
          setPaginationData(data);
        })
        .catch(() => {
          setItems([]);
        })
        .finally(() => setLoadingList(false));
    })();
  }, [currentPage, searchFilter, sortFilter]);

  const changePage = (page) => setCurrentPage(page);
  const changeSearchFilter = (search) => setSearchFilter(search);
  const changeSortFilter = (sort) => setSortFilter(sort);

  const renderList = () => {
    return loadingList ? (
      <Row className="justify-content-center mt-5">
        <Spinner></Spinner>
      </Row>
    ) : (
      <Row>
        {items.map((item) => (
          <Col xs="12" sm="6" md="3" lg="3" key={item.id}>
            <CardItem
              title={item.name}
              description={item.description}
              price={item.price}
              id={item.id}
              picture={item.picture}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <Filter
        changeSearchFilter={changeSearchFilter}
        searchFilter={searchFilter}
        changeSortFilter={changeSortFilter}
        sortFilter={sortFilter}
        loadingList={loadingList}
      />
      {renderList()}
      {!loadingList && items.length > 0 ? (
        <Row className="justify-content-center">
          <ItemsPagination
            handleChangeCurrentPage={changePage}
            {...paginationData}
          />
        </Row>
      ) : (
        ""
      )}
    </>
  );
};

export default HomePage;
