import { useCallback, useState } from 'react';

export const useDataGrid = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortModel, setSortModel] = useState([]);

  const getRequest = useCallback(
    () => ({
      page: page + 1,
      pageSize,
      sortField: sortModel[0]?.field || 'Id',
      sortOrder: sortModel[0]?.sort || 'asc'
    }),
    [page, pageSize, sortModel]
  );

  return { page, setPage, pageSize, setPageSize, sortModel, setSortModel, getRequest };
};
