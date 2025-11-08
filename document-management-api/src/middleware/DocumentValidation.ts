import { VALIDATION_RULES } from "../constants/DocumentConstants";
import { Request, Response, NextFunction } from "express";
import { GetDocumentRequest } from "types/DocumentTypes";

const { SEARCH } = VALIDATION_RULES;

interface ValidationError {
  field: string;
  message: string;
}

export class DocumentValidation {
  static validateGetDocuments = (
    req: Request<{}, {}, {}, GetDocumentRequest>,
    res: Response,
    next: NextFunction
  ): void => {
    const errors: ValidationError[] = [];
    const { page, pageSize } = req.query;

    if (page !== undefined) {
      const pageNum = parseInt(page, 10);
      if (isNaN(pageNum) || pageNum < SEARCH.MIN_PAGE) {
        errors.push({
          field: "page",
          message: `Page must be a number greater than or ${SEARCH.MIN_PAGE}`,
        });
      }
    }

    if (pageSize !== undefined) {
      const pageSizeNum = parseInt(pageSize as string, 10);
      if (
        isNaN(pageSizeNum) ||
        pageSizeNum < VALIDATION_RULES.SEARCH.MIN_PAGE_SIZE ||
        pageSizeNum > VALIDATION_RULES.SEARCH.MAX_PAGE_SIZE
      ) {
        errors.push({
          field: "pageSize",
          message: `Page size must be between ${VALIDATION_RULES.SEARCH.MIN_PAGE_SIZE} and ${VALIDATION_RULES.SEARCH.MAX_PAGE_SIZE}`,
        });
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
      return;
    }

    next();
  };
}
