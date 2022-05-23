import { injectable } from 'inversify';
import mongoose, { ClientSession } from 'mongoose';
import 'reflect-metadata';

export interface ITransactionManager {
  startTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getCurrentTransaction(): any;
}

@injectable()
export class TransactionManager implements ITransactionManager {
  private _session: ClientSession;

  constructor() {}

  async startTransaction(): Promise<void> {
    if (this._session) {
      throw new Error('transaction already started');
    }

    this._session = await mongoose.startSession();
    this._session.startTransaction();
  }

  async commit(): Promise<void> {
    await this._session.commitTransaction();
  }

  async rollback(): Promise<void> {
    await this._session.abortTransaction();
  }

  getCurrentTransaction(): any {
    return this._session;
  }
}
