export const SUPPORTED_FILE_TYPES = {
  PDF: "pdf",
  DOCX: "docx",
  TXT: "txt",
  XLSX: "xlsx",
  PPTX: "pptx",
  JPG: "jpg",
  PNG: "png",
} as const;

export type SupportedFileType = (typeof SUPPORTED_FILE_TYPES)[keyof typeof SUPPORTED_FILE_TYPES];
