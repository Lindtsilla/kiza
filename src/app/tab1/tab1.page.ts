import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Contacts, GetContactOptions, GetContactsResult } from '@capacitor-community/contacts';
import {AlertController, ToastController} from '@ionic/angular';
import { IonModal } from '../../../node_modules/@ionic/core/components/ion-modal.d';
import { AuthService } from '../services/auth.service';
import {HttpClient} from "@angular/common/http";
import {BalanceService} from "../services/balance.service";
import {TransactionService} from "../services/transaction.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  loader: boolean = false;
  show:boolean = false;
  private authService: AuthService = inject(AuthService);
  private http: HttpClient = inject(HttpClient);
   balanceService: BalanceService = inject(BalanceService);
  private transactionService: TransactionService = inject(TransactionService);
  private toastController: ToastController = inject(ToastController);

  transactions:any[]=[];
  allContact:any[] = [];
  resultsContact = [...this.allContact];
  contactPhone:any[] = [];
  benfValue:any;
  userForm:any={
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
  }
  benId!:string;
  index=0;

  topUpForm: any = {
    amount: "",
    phoneNumber: "",
    operator: "",
  }

  withdrawForm: any = {
    amount: "",
    phoneNumber: "",
    operator: "",
  }


  @ViewChild('contactImport') contactImport!: IonModal

  constructor(private alertCtrl: AlertController) {

  }
  async ngOnInit() {

    this.setDataView();

    // localStorage.setItem('contact', JSON.stringify([
    //   {
    //     name: "davin",
    //     numberWithCode:"+237696447402"
    //   }
    // ]))

    this.transactions = this.transactionService.getTransactions();

    this.userForm = await this.authService.getUser()
    this.allContact = JSON.parse(localStorage.getItem('contact') as string) as any[]
   }



  async topUpWallet(){
    this.loader = true;
    console.log(this.topUpForm)

    if(parseInt(this.topUpForm.amount) < 500){
      await this.presentToast("Montant Minimum est de 500 XAF")
      return;
    }
    this.http.post('https://core.diool.com/core/dioolapi/v1/payment', {
      "accountIdentifier": this.topUpForm.phoneNumber,
      "amount": this.topUpForm.amount,
      "providerIdentifier": this.topUpForm.operator ,
      "referenceOrder": "23yeuincdnhdj",
      "description":"description",
      "orderId":"12345547jddkd342",
      "subscriberMsisdn":"testmsisdn"
    }, {
      headers:{
        "Authorization": "Bearer api_live.Mz3XBzzZJ/cPtcU7Rvo74Grlg4N9HKT2MoCG6lGWiXC0PdD7Xb6yw/LtaLME1blQ",
        "Content-Type": "application/json",
      }
    }).subscribe(async (data: any) => {
        this.loader = false;
        console.log(data)
        if (data?.resultType === "SUCCESS") {
          //update balance
          this.balanceService.creditBalance(this.topUpForm.amount)
          // create transaction
          this.transactionService.createtransaction({
            amount: this.topUpForm.amount,
            type: "credit",
            phoneNumber: this.topUpForm.phoneNumber,
            status: data?.resultType === "SUCCESS" ? "SUCCESS" : "FAILED"
          })
          this.transactions = this.transactionService.getTransactions();
        }


        await this.presentToast("Transaction terminer")
      },
      async (error) => {
        this.loader = false;
        await this.presentToast("Une erreur es survenue")
        console.log(error)
      })

  }

  async withdrawWallet() {
    this.loader = true;
    console.log(this.withdrawForm)

    if(this.withdrawForm.amount > this.balanceService.getBalance()){
      await this.presentToast("Solde insuffisant")
      return;
    }

    if(parseInt(this.withdrawForm.amount) < 500){
      await this.presentToast("Montant Minimum est de 500 XAF")
      return;
    }

    this.http.post('https://core.diool.com/core/dioolapi/v1/transfer', {
      "accountIdentifier": this.withdrawForm.phoneNumber,
      "amount": this.withdrawForm.amount,
      "providerIdentifier": this.withdrawForm.operator ,
    }, {
      headers:{
        "Authorization": "Bearer api_live.Mz3XBzzZJ/cPtcU7Rvo74Grlg4N9HKT2MoCG6lGWiXC0PdD7Xb6yw/LtaLME1blQ",
        "Content-Type": "application/json",
      }
    }).subscribe(async (data: any) => {
        this.loader = false;
        console.log(data)
        if (data?.resultType === "SUCCESS") {
          //update balance
          this.balanceService.debitBalance(this.withdrawForm.amount)
          // create transaction
          this.transactionService.createtransaction({
            amount: this.withdrawForm.amount,
            type: "debit",
            phoneNumber: this.withdrawForm.phoneNumber,
            status: data?.resultType === "SUCCESS" ? "SUCCESS" : "FAILED"
          })
          this.transactions = this.transactionService.getTransactions();
        }

        await this.presentToast("Transaction terminer")

      },
      async (error) => {
        this.loader = false;
        await this.presentToast("Une erreur es survenue")
        console.log(error)
      })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
    });

    await toast.present();
  }

  async getAllContactPhoneUuser() {

    const projection = {
       name: true,
      phones: true,
      postalAddresses: true,
    };

    const result = await Contacts.getContacts({
      projection,
    });


    this.formatDataGettingPhone(result);
    this.contactImport.present();


  }

  formatDataGettingPhone(data: GetContactsResult ){

    let contact:any[] = [],
     ben: any;
     this.contactPhone =[];


    for(let item of data.contacts) {

      let phone  = item.phones ? item.phones : []

      for(let x of phone){

        this.contactPhone.push({
          name: item?.name?.display,
          numberWithCode: x.number,
          real_id: x.isPrimary
        });
      }

    }


  }

  returnData(): any[]{
    return JSON.parse(localStorage.getItem('contact') as any)
  }



   setBenf(setBenf:any) {
    this.benfValue = this.contactPhone.find((x: any) => x.numberWithCode == setBenf);
    this.benId = setBenf;
  }

   addContactPhone(){
    localStorage.setItem('contact', JSON.stringify([...this.allContact, this.benfValue]));
    this.allContact = this.returnData();
    this.contactImport.dismiss();

   }

   async getprofile() {
    this.userForm = await this.authService.getUser()
  }


setDataView() {
  if(this.returnData()?.length > 0) this.resultsContact = this.returnData();
  else{
    this.resultsContact = [
      {
        name: 'Linda',
        numberWithCode: '237 699 99 99 99',
        real_id: ''
      },
      {
        name: 'Touch',
        numberWithCode: '237 699 99 99 99',
        real_id: ''
      }
    ];
   }
}
   async importContact() {

    let permission = await Contacts.checkPermissions()

    if (permission) {
      this.getAllContactPhoneUuser();
    } else {

      let alert = this.alertCtrl.create({
        header: "KIZA Apps",
        subHeader: "Access Contact",
        message: "Autoriser KIZA a acceder a vos documents",
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Valider',
            handler: () => {
              this.getAllContactPhoneUuser();
            }
          }
        ]

      },

      )


    }

  }


}
