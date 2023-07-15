import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Contacts, GetContactOptions, GetContactsResult } from '@capacitor-community/contacts';
import { AlertController } from '@ionic/angular';
import { IonModal } from '../../../node_modules/@ionic/core/components/ion-modal.d';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  loader: boolean = false;
  show:boolean = false;
  private authService: AuthService = inject(AuthService);


  constructor(private alertCtrl: AlertController) {
    
  }
  ngOnInit() {

this.setDataView();


   }

  transactions:any[]=[
    {
      name: 'Maman',
      amount: 180000,
      date: '21 May',
      motif: 'Recharge tel'
    },
    {
      name: 'Steves',
      amount: 63000,
      date: '21 May',
      motif: 'Recharge tel'
    },
    {
      name: 'Ibrahim',
      amount: 90000,
      date: '21 May',
      motif: 'Recharge tel'
    },
    {
      name: 'Audrey',
      amount: 120000,
      date: '21 May',
      motif: 'Recharge tel'
    },
    {
      name: 'Thierno',
      amount: 18000,
      date: '21 May',
      motif: 'Recharge tel'
    }
  ];
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

  @ViewChild('contactImport') contactImport!: IonModal

  submitData(){
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
 
    }, 5000);
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
