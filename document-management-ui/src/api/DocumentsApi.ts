import { AddFolderRequest, FetchDocumentsRequest, FetchDocumentsResponse, UploadFileRequest } from "@/types/Documents";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_CONFIG = {
  FETCH_DOCUMENTS: "/api/documents",
  UPLOAD_FILE: "/api/documents/uploadFile",
  UPLOAD_FOLDER: "/api/documents/uploadFolder",
};

export function DocumentApi() {
  async function fetchDocuments(request: FetchDocumentsRequest): Promise<FetchDocumentsResponse> {
    const { title, pagination } = request;

    const params = new URLSearchParams();

    if (title) {
      params.append("title", title);
    }

    if (pagination) {
      if (pagination.page) {
        params.append("page", pagination.page.toString());
      }
      if (pagination.pageSize) {
        params.append("pageSize", pagination.pageSize.toString());
      }
    }

    // Build the URL with query string
    const queryString = params.toString();
    const url = `${API_BASE_URL}${API_CONFIG.FETCH_DOCUMENTS}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }

    const data = await response.json();

    return data.data;
  }

  async function uploadFiles(file: UploadFileRequest) {
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.UPLOAD_FILE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await response.json();

    return data;
  }

  async function addFolder(folder: AddFolderRequest) {
    const response = await fetch(`${API_BASE_URL}${API_CONFIG.UPLOAD_FOLDER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folder),
    });

    if (!response.ok) {
      throw new Error("Failed to add folder");
    }

    const data = await response.json();

    return data;
  }

  return { fetchDocuments, uploadFiles, addFolder };
}
