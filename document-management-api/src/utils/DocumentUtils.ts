import { VALIDATION_RULES } from "../constants/DocumentConstants";
import { DocumentSearchParams, GetDocumentRequest } from "../types/DocumentTypes";

const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = VALIDATION_RULES.SEARCH;

export function DocumentUtils() {
  function parseSearchParams(query: GetDocumentRequest): DocumentSearchParams {
    const { title, page, pageSize } = query;

    return {
      title: title?.trim() || undefined,
      page: page ? parseInt(page) : DEFAULT_PAGE,
      pageSize: pageSize ? parseInt(pageSize) : DEFAULT_PAGE_SIZE,
    };
  }

  return { parseSearchParams };
}
