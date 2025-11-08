"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DocumentTableActions } from "./DocumentTableActions";
import { DocumentApi } from "@/api/DocumentsApi";
import { DocumentTableHeader } from "./DocumentTableHeader";
import { DocumentTableItem } from "./DocumentTableItem";
import { EmptyDocumentTableContent } from "./EmptyDocumentTableContent";
import { useTablePagination } from "@/hooks/useTablePagination";
import { TablePagination } from "./common/TablePagination";

interface DocumentTableProps {
  selectedItems?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  itemsPerPage?: number;
}

const { fetchDocuments } = DocumentApi();

export default function DocumentTable({ itemsPerPage = 10 }: DocumentTableProps) {
  const [searchValue, setSearchValue] = useState("");

  const { page, pageSize, handlePageChange, handlePageSizeChange, resetPagination } = useTablePagination(itemsPerPage);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["documents", searchValue, page, pageSize],
    queryFn: () =>
      fetchDocuments({
        title: searchValue,
        pagination: { page, pageSize },
      }),
  });

  const items = data?.documents || [];
  const totalItems = data?.pagination?.totalCount || 0;

  const handleSearch = (query: string) => {
    setSearchValue(query);
    resetPagination();
  };

  return (
    <>
      <DocumentTableActions onSearch={handleSearch} />
      {items.length === 0 && !isLoading ? (
        <EmptyDocumentTableContent />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <DocumentTableHeader />
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => {
                    return <DocumentTableItem key={item.id} item={item} index={index} />;
                  })
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && !isError && items.length > 0 && (
            <TablePagination
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      )}
    </>
  );
}
