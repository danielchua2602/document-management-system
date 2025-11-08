import { useState } from "react";

const INITIAL_PAGE_SIZE = 10;
const INITIAL_PAGE = 1;

export function useTablePagination(initialPageSize = INITIAL_PAGE_SIZE) {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const setPagination = (newPage: number, newPageSize: number) => {
    setPage(newPage ?? INITIAL_PAGE);
    setPageSize(newPageSize ?? INITIAL_PAGE_SIZE);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(INITIAL_PAGE);
  };

  const resetPagination = () => {
    setPage(INITIAL_PAGE);
    setPageSize(initialPageSize);
  };

  return {
    page,
    pageSize,
    setPagination,
    handlePageChange,
    handlePageSizeChange,
    resetPagination,
  };
}
