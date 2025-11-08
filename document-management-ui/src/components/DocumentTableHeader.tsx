export function DocumentTableHeader() {
  return (
    <thead className="bg-blue-900 border-b border-blue-100 text-white">
      <tr className="text-left font-medium text-sm">
        <th className="px-6 py-4">
          <input type="checkbox" className="h-4 w-4 rounded" />
        </th>
        <th className="px-6 py-4">Name</th>
        <th className="px-6 py-4">Created By</th>
        <th className="px-6 py-4">Date</th>
        <th className="px-6 py-4">File Size</th>
      </tr>
    </thead>
  );
}
