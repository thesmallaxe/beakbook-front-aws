import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Link, useLocation } from "react-router-dom";
import { PaginationItem } from "@mui/material";

const Paginator = (props) => {
  const { path, data, paginateAction, search } = props;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page_number = parseInt(query.get("page") || "1", 10);

  const [page, setPage] = useState(page_number);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    paginateAction(search, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="paginator">
      <Pagination
        count={data?.last_page ?? 1}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/${path + (item.page === 1 ? "" : `?page=${item.page}`)}`}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default Paginator;
