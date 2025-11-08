"use client";

import { Folder } from "@/types/Documents";
import { useAddFolder } from "@/hooks/useAddFolder";

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (folder: Omit<Folder, "id" | "createdAt" | "modifiedAt" | "createdBy">) => void;
}

export default function AddFolderModal({ isOpen, onClose }: AddFolderModalProps) {
  const {
    setName,
    name,
    formError,
    handleClose,
    handleSubmit,
    mutationStates: { isPending, isError },
  } = useAddFolder({ onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleClose}>
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Add Folder</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors
            disabled:hover:text-gray-400 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="folder-name" className="block text-sm font-medium text-gray-700 mb-1">
              Folder Name
            </label>
            <input
              type="text"
              id="folder-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${formError ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter folder name"
              autoFocus
            />
            {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Instead of uploading an actual folder, this modal will simulate the process of adding a new folder.
          </p>

          {isError && (
            <p className="text-red-500 text-sm mt-1">An error occurred while adding the folder. Please try again.</p>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-blue-800 bg-white text-blue-800 rounded-md hover:bg-gray-50 transition-colors
              disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-800 rounded-md hover:bg-blue-900 transition-colors 
              disabled:opacity-50 disabled:hover:bg-blue-800 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </div>
              ) : (
                "Add Folder"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
