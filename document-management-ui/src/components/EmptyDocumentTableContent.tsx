export function EmptyDocumentTableContent({ loading = false }: { loading?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No files or folders yet</h3>
      <p className="text-gray-500 text-center max-w-md">
        Get started by adding your first file or creating a new folder to organize your files
      </p>
    </div>
  );
}
