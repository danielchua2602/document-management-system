import { Router } from "express";
import DocumentController from "../controllers/DocumentController";
import { DocumentValidation } from "../middleware/DocumentValidation";

const router = Router();
const documentController = new DocumentController();

router.post("/uploadFile", documentController.uploadFile);
router.post("/uploadFolder", documentController.uploadFolder);

router.get("/", DocumentValidation.validateGetDocuments, documentController.getDocuments);

export default router;
