import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function ItemsPagination({
  handleChangeCurrentPage,
  current_page,
  last_page,
  links = [],
}) {
  const [pageLinks, setPageLinks] = useState([]);

  useEffect(() => {
    if (links.length > 0) {
      setPageLinks(links.slice(1, links.length - 1));
    }
  }, [links]);

  const changePage = (page) => {
    const newPage = parseInt(page);

    if (!isNaN(newPage)) {
      handleChangeCurrentPage(newPage);
    }
  };

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={current_page === 1}>
        <PaginationLink first onClick={() => changePage(1)} />
      </PaginationItem>
      <PaginationItem disabled={current_page === 1}>
        <PaginationLink previous onClick={() => changePage(current_page-1)} />
      </PaginationItem>
      {pageLinks.map((pageLink, index) => (
        <PaginationItem key={index} active={pageLink.active} disabled={pageLink.active}>
          <PaginationLink onClick={() => changePage(pageLink.label)}>
            {pageLink.label}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={current_page === last_page}>
        <PaginationLink next onClick={() => changePage(current_page+1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          disabled={current_page === last_page}
          onClick={() => changePage(last_page)}
        />
      </PaginationItem>
    </Pagination>
  );
}
