import { RowDataPacket } from "mysql2";

// For mapping get document list rows =============================================
interface BaseDocumentRow extends RowDataPacket {
  documentId: number;
  isFolder: boolean;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  isDeleted: boolean;
}

interface FileData {
  fileId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
}

interface FolderData {
  folderId: number;
  folderName: string;
}

export type DocumentRow = BaseDocumentRow & (FileData | FolderData);

export type DocumentCountResult = RowDataPacket & {
  total: number;
};

// Insert Folder and File  ================================================
export interface Folder {
  id: number;
  title: string;
  // files: File[]; - Not supported for now
}

export interface File {
  id: number;
  title: string;
  type: string;
  size: number;
  content: string;
}
