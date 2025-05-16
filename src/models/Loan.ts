import { Schema, model, Document, Types } from 'mongoose';

export interface ILoan extends Document {
  userId: Types.ObjectId;    // <-- change here
  loanOfficer: string;
  amount: number;
  dateApplied: Date;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'APPROVED';
}

const loanSchema = new Schema<ILoan>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  loanOfficer: { type: String, required: true },
  amount: { type: Number, required: true },
  dateApplied: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'REJECTED', 'APPROVED'],
    default: 'PENDING',
  },
});

export const Loan = model<ILoan>('Loan', loanSchema);
