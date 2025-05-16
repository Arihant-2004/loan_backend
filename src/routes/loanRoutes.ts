import { Router } from 'express';
import {
  createLoan,
  getLoans,
  updateLoanStatus,
} from '../controllers/loanController';
import { z } from 'zod';
import { validate} from '../utils/validate';

const router = Router();

// Validation schemas
const createSchema = z.object({
  body: z.object({
    userId: z.string(),
    amount: z.number(),
  }),
});
const statusSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({ status: z.enum(['PENDING','VERIFIED','REJECTED','APPROVED']) }),
});

// Routes
router.post('/', validate(createSchema), createLoan);
router.get('/', getLoans);
router.patch('/:id/status', validate(statusSchema), updateLoanStatus);

export default router;
