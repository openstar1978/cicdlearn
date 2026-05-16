import { useState } from "react";

export const useDataGrid = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState([]);
const defaultPaging = {
  page: 0,
  pageSize: 10,
  sortField: "Id",
  sortOrder: "asc"
};
  const getRequest = () => {
    return {
      page: page + 1,
      pageSize,
      sortField: sortModel[0]?.field || "Id",
      sortOrder: sortModel[0]?.sort || "asc"
    };
  };

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    sortModel,
    setSortModel,
    getRequest
  };
};