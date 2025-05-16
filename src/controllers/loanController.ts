import { Request, Response } from 'express';
import { Loan } from '../models/Loan';

export const createLoan = async (req: Request, res: Response): Promise<void> => {
  const loan = await Loan.create({
    userId: req.body.userId,
    amount: req.body.amount,
    loanOfficer: 'John Okoh', // in real app, derive from auth
  });

  res.status(201).json(loan);
};

export const getLoans = async (_: Request, res: Response): Promise<void> => {
  const loans = await Loan.find().sort({ dateApplied: -1 });
  res.json(loans);
};

export const updateLoanStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await Loan.findByIdAndUpdate(id, { status }, { new: true });

  if (!updated) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.json(updated);
};
