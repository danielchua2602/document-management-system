import { ResultSetHeader } from "mysql2";
import { pool } from "../database/connection";
import {
  DocumentSearchParams,
  GetDocumentListResponse,
  UploadFileRequest,
  UploadFolderRequest,
} from "types/DocumentTypes";
import { DocumentCountResult, DocumentRow } from "models/document";

export class DocumentService {
  async getDocuments(searchParams: DocumentSearchParams): Promise<GetDocumentListResponse> {
    const { title, page, pageSize } = searchParams;

    const offset = (page - 1) * pageSize;

    const hasSearch = Boolean(title && title.length > 0);

    const whereClause = hasSearch
      ? "WHERE doc.isDeleted = 0 AND (fi.title LIKE ? OR fo.title LIKE ?)"
      : "WHERE doc.isDeleted = 0";

    const searchValues = hasSearch ? [`%${title!.trim()}%`, `%${title!.trim()}%`] : [];

    const countQuery = `SELECT COUNT(DISTINCT doc.id) as total
         FROM documents as doc
         LEFT JOIN files fi ON fi.documentId = doc.id
         LEFT JOIN folders fo ON fo.documentId = doc.id
         ${whereClause}`;

    const [countRows] = await pool.execute<DocumentCountResult[]>(countQuery, searchValues);

    const totalCount = countRows[0].total;

    const mainQuery = `SELECT DISTINCT
          doc.id as documentId,
          doc.isFolder,
          doc.createdBy,
          doc.createdDate,
          doc.lastModifiedBy,
          doc.lastModifiedDate,
          
          -- File information
          fi.id as fileId,
          fi.title as fileName,
          fi.type as fileType,
          fi.size as fileSize,
          
          -- Folder information  
          fo.id as folderId,
          fo.title as folderName
          
        FROM documents as doc
        LEFT JOIN files fi ON fi.documentId = doc.id
        LEFT JOIN folders fo ON fo.documentId = doc.id
        ${whereClause}
        ORDER BY doc.createdDate DESC, fi.title ASC, fo.title ASC
        LIMIT ${pageSize} OFFSET ${offset}`;

    const [rows] = await pool.execute<DocumentRow[]>(mainQuery, searchValues);

    return {
      documents: this.mapDocumentRowToDocument(rows),
      pagination: {
        totalCount: totalCount,
        page: page,
        pageSize: pageSize,
      },
    };
  }

  async uploadFile(documentData: UploadFileRequest): Promise<boolean> {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [docResult] = await connection.execute<ResultSetHeader>(
        `INSERT INTO documents (isFolder, createdBy, lastModifiedBy) 
         VALUES (?, ?, ?)`,
        [false, "John Green", "John Green"]
      );

      const documentId = docResult.insertId;

      await connection.execute<ResultSetHeader>(
        `INSERT INTO files (documentId, title, type, size, base64Data) 
         VALUES (?, ?, ?, ?, ?)`,
        [documentId, documentData.title, documentData.type, documentData.size, documentData.content]
      );

      await connection.commit();

      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // TODO: File upload for folders
  async uploadFolder(documentData: UploadFolderRequest): Promise<boolean> {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [docResult] = await connection.execute<ResultSetHeader>(
        `INSERT INTO documents (isFolder, createdBy, lastModifiedBy) 
         VALUES (?, ?, ?)`,
        [true, "John Green", "John Green"]
      );

      const documentId = docResult.insertId;

      await connection.execute<ResultSetHeader>(
        `INSERT INTO folders (documentId, title) 
         VALUES (?, ?)`,
        [documentId, documentData.title]
      );

      await connection.commit();

      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  private mapDocumentRowToDocument(rows: DocumentRow[]) {
    return rows.map((row) => ({
      id: row.documentId,
      isFolder: Boolean(row.isFolder),
      createdBy: row.createdBy,
      createdDate: row.createdDate,
      lastModifiedBy: row.lastModifiedBy,
      lastModifiedDate: row.lastModifiedDate,

      file: row.isFolder
        ? undefined
        : {
            id: row.fileId,
            title: row.fileName,
            type: row.fileType,
            size: row.fileSize,
          },
      folder: row.isFolder
        ? {
            id: row.folderId,
            title: row.folderName,
            files: [],
          }
        : undefined,
    }));
  }
}
