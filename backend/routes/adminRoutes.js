import { Router } from 'express';
import express from 'express';
import { createResult, uploadResultPdf } from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = Router();

router.post('/results', adminAuth, createResult);
router.post(
  '/results/:resultId/pdf',
  adminAuth,
  express.raw({ type: 'application/pdf', limit: '8mb' }),
  uploadResultPdf
);

export default router;
