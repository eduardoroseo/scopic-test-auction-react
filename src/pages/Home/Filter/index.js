import React from "react";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

const Filter = ({
  searchFilter,
  changeSearchFilter,
  sortFilter,
  changeSortFilter,
  loadingList,
}) => {
  const handleChangeSearchFilter = (event) => {
    const { value } = event.target;

    if (value && value.length > 2) {
      changeSearchFilter(value);
    }

    if (!value) changeSearchFilter(value);
  };

  const handleClickSortButton = () => {
    if (!sortFilter) changeSortFilter("asc");
    if (sortFilter === "asc") changeSortFilter("desc");
    if (sortFilter === "desc") changeSortFilter("asc");
  };

  const renderSortText = () => {
    if (sortFilter === "asc") return "More Expensive";

    return "Cheaper";
  };

  return (
    <Row className="mb-2">
      <Col>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fa fa-search"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            onChange={handleChangeSearchFilter}
            placeholder="Search by name"
            disabled={loadingList}
            value={searchFilter}
          />
          <InputGroupAddon hidden={!searchFilter} addonType="append">
            <Button
              outline
              onClick={() => changeSearchFilter(null)}
              color="default"
              disabled={loadingList}
            >
              <i className="fa fa-times-circle"></i>{" "}
            </Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button
              onClick={handleClickSortButton}
              color="secondary"
              disabled={loadingList}
            >
              {renderSortText()} <i className="fa fa-sort-amount-down-alt"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default Filter;
