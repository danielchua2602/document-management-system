import { SupportedFileType } from "@/types/SupportedFiles";

export function DocumentTableUtils() {
  function getFileIcon(fileType: SupportedFileType): string {
    const iconMap: { [key in SupportedFileType]: string } = {
      pdf: "📄",
      docx: "📄",
      txt: "📄",
      xlsx: "📊",
      pptx: "📊",
      jpg: "🖼️",
      png: "🖼️",
    };

    return iconMap[fileType] || "";
  }

  function formatDate(date: string): string {
    return new Intl.DateTimeFormat("en-SG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  return {
    getFileIcon,
    formatDate,
    formatFileSize,
  };
}
