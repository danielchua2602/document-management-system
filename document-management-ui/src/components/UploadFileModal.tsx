"use client";

import { SUPPORTED_FILE_TYPES } from "@/types/SupportedFiles";
import { useUploadFile } from "@/hooks/useUploadFile";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadFileModal({ isOpen, onClose }: UploadFileModalProps) {
  const {
    formData,
    setFormData,
    errors,
    handleSubmit,
    handleClose,
    mutationStates: { isPending, isError },
  } = useUploadFile({ onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleClose}>
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Upload File</h2>
          {/* Close Button */}
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              File Title
            </label>
            <input
              type="text"
              id="name"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter File title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              File Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md  ${errors.type ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select file type</option>
              {Object.values(SUPPORTED_FILE_TYPES).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
              File Size (bytes)
            </label>
            <input
              type="number"
              id="size"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md ${errors.size ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter file size in bytes"
              min="1"
            />
            {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Instead of uploading an actual file, this modal will simulate the process of adding a new file.
          </p>

          {isError && (
            <p className="text-red-500 text-sm mt-1">An error occurred while uploading the file. Please try again.</p>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-blue-800 bg-white text-blue-800 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-800 rounded-md hover:bg-blue-900 transition-colors"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading...
                </div>
              ) : (
                "Upload File"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
