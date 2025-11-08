import { Document } from "@/types/Documents";
import { DocumentTableUtils } from "@/utils/DocumentTableUtils";

const { getFileIcon, formatDate, formatFileSize } = DocumentTableUtils();

export function DocumentTableItem({ item, index }: { item: Document; index: number }) {
  const fileIconData = item.isFolder ? null : getFileIcon(item.file.type);

  return (
    <tr
      className={`hover:bg-gray-50 transition-all duration-200 group ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          className="h-4 w-4 text-gray-600 border-gray-300 rounded transition-colors cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
        <div className="flex items-center group">
          <div className="flex-shrink-0 mr-4">
            {/* Render Icons */}
            {item.isFolder ? (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                <span className="text-lg text-gray-600">{fileIconData || "📄"}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-600 transition-colors truncate">
              {item.isFolder ? item.folder.title : item.file.title}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            <span className="text-xs font-medium text-gray-700">
              {item.createdBy
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-900">{item.createdBy}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600 font-medium">{formatDate(item.createdDate)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.isFolder ? (
          <span className="text-sm text-gray-400 font-medium">—</span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {formatFileSize(item.file.size)}
          </span>
        )}
      </td>
    </tr>
  );
}
