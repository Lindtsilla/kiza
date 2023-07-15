import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  public getTransactions(): any[]{
    return JSON.parse(localStorage.getItem('transactions') as string || '[]') as any[];
  }

  public createtransaction(transaction: any){
    if(this.getTransactions().length === 0){
      let transactions =[
        {
          amount: transaction.amount,
          type: transaction.type,
          phoneNumber: transaction.phoneNumber,
          status: transaction.status,
          date: (new Date()).toDateString()
        }
      ]
      localStorage.setItem('transactions',JSON.stringify(transactions))
    }else{
      let transactions =  [ transaction, ...this.getTransactions()];
      localStorage.setItem('transactions',JSON.stringify(transactions))
    }
    return transaction
  }

}
