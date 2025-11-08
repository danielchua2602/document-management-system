import { Request, Response, NextFunction } from "express";
import { DocumentService } from "../services/DocumentService";
import { GetDocumentRequest, UploadFileRequest, UploadFolderRequest } from "../types/DocumentTypes";
import { DocumentUtils } from "../utils/DocumentUtils";

export class DocumentController {
  private documentService: DocumentService;

  constructor() {
    this.documentService = new DocumentService();
  }

  public getDocuments = async (
    req: Request<{}, {}, {}, GetDocumentRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const parsedQueries = DocumentUtils().parseSearchParams(req.query);

      const documents = await this.documentService.getDocuments(parsedQueries);

      res.status(200).json({
        success: true,
        data: documents,
      });
    } catch (error) {
      next(error);
    }
  };

  public uploadFile = async (
    req: Request<{}, {}, UploadFileRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title } = req.body;

      // TODO: Perform simple validation here
      if (!title) {
        res.status(400).json({
          success: false,
          message: "Title is required",
        });
        return;
      }

      await this.documentService.uploadFile(req.body);

      res.status(201).json({
        success: true,
        message: "File uploaded successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public uploadFolder = async (
    req: Request<{}, {}, UploadFolderRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title } = req.body;

      console.log("Upload Folder Controller reached");
      // TODO: Perform simple validation here
      if (!title) {
        res.status(400).json({
          success: false,
          message: "Title is required",
        });
        return;
      }

      await this.documentService.uploadFolder(req.body);

      res.status(201).json({
        success: true,
        message: "Folder uploaded successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default DocumentController;
