import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor() { }

  getBalance(){
    if(localStorage.getItem('balance') === null){
      localStorage.setItem('balance', JSON.stringify(0))
    }
    return JSON.parse(localStorage.getItem('balance') as string)
  }

  creditBalance(amount: any){
    let newBalance = parseInt(this.getBalance())
    console.log('balance - '+ newBalance)
     newBalance +=  parseInt(amount);
    console.log('balance - '+ newBalance)
    return localStorage.setItem('balance',JSON.stringify(newBalance) );
  }

  debitBalance(amount:any){
    console.log('balance - '+ parseInt(this.getBalance()))
    let newBalance = parseInt(this.getBalance()) - parseInt(amount)
    console.log('balance - '+ newBalance)
    return localStorage.setItem('balance',JSON.stringify(newBalance) );
  }



}
