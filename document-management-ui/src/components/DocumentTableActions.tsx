`use client`;

import { useState } from "react";
import UploadFileModal from "./UploadFileModal";
import AddFolderModal from "./AddFolderModal";

interface DocumentTableActionsProps {
  onSearch: (query: string) => void;
}

export function DocumentTableActions({ onSearch }: DocumentTableActionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 pl-10 border border-gray-300 bg-white rounded-lg"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowAddFileModal(true)}
          className="flex items-center gap-2 px-4 py-2 border border-blue-800 bg-white text-blue-800 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Upload files
        </button>
        <button
          onClick={() => setShowAddFolderModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add new folder
        </button>
      </div>

      <UploadFileModal isOpen={showAddFileModal} onClose={() => setShowAddFileModal(false)} />
      <AddFolderModal isOpen={showAddFolderModal} onClose={() => setShowAddFolderModal(false)} onAdd={() => {}} />
    </div>
  );
}
