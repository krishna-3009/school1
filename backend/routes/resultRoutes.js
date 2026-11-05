import { Router } from 'express';
import { downloadResultPdf, lookupResult } from '../controllers/resultController.js';
import lookupLimiter from '../middleware/lookupLimiter.js';

const router = Router();

router.post('/lookup', lookupLimiter, lookupResult);
router.post('/pdf', lookupLimiter, downloadResultPdf);

export default router;
