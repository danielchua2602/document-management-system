import { SupportedFileType } from "./SupportedFiles";

export type BaseDocument = {
  id: string;
  createdBy: string;
  createdDate: string;
};

export type File = {
  id: string;
  title: string;
  type: SupportedFileType;
  size: number;
  content?: string;
};

export type Folder = {
  id: string;
  title: string;
  files: File[];
};

export type FileDocument = BaseDocument & {
  isFolder: false;
  file: File;
};

export type FolderDocument = BaseDocument & {
  isFolder: true;
  folder: Folder;
};

export type Document = FileDocument | FolderDocument;

export type FetchDocumentsRequest = {
  title?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
};
export type FetchDocumentsResponse = {
  documents: Document[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
  };
};

export type UploadFileFormData = {
  title: string;
  type: string;
  size: string;
};

export type UploadFileRequest = Omit<File, "id">;

export type AddFolderFormData = {
  title: string;
};

export type AddFolderRequest = Omit<Folder, "id" | "files">;
