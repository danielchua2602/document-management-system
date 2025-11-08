import { Folder, File } from "models/document";

export interface UploadFileRequest extends Omit<File, "id"> {}

export interface UploadFolderRequest {
  title: string;
}

export type Document = {
  id: number;
  isFolder: boolean;

  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;

  file?: Omit<File, "content">;
  folder?: Folder;
};

export type Pagination = {
  totalCount: number;
  page: number;
  pageSize: number;
};

export type GetDocumentListResponse = {
  documents: Document[];
  pagination: Pagination;
};

export type GetDocumentRequest = {
  title?: string;
  page?: string;
  pageSize?: string;
};

export type DocumentSearchParams = {
  title?: string;
  page: number;
  pageSize: number;
};
