import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacts, GetContactOptions, GetContactsResult } from '@capacitor-community/contacts';
import { AlertController } from '@ionic/angular';
import { IonModal } from '../../../node_modules/@ionic/core/components/ion-modal.d';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  loader: boolean = false;

  constructor(private alertCtrl: AlertController) {
    
  }
  ngOnInit() {

this.setDataView();


   }

  transactions:any[]=[1,2,3,4,5,6];
  allContact:any[] = [];
  resultsContact = [...this.allContact];
  contactPhone:any[] = [];
  benfValue:any;

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
     ben: any,
     allContact =[];


    for(let item of data.contacts) {

      let phone  = item.phones ? item.phones : []

      for(let x of phone){
        allContact.push({
          name: item?.name?.display,
          numberWithCode: x.number,
          real_id: x.isPrimary
        })

        this.contactPhone = [...this.allContact];
      }
       
    }
 
 
  }

  returnData(): any[]{
    return JSON.parse(localStorage.getItem('contact') as any)
  }

  setBenf(setBenf:any) {
    this.benfValue = this.contactPhone.find((x: any) => x.real_id == setBenf);
   }

   addContactPhone(){
    localStorage.setItem('contact', JSON.stringify(this.benfValue));
    this.contactImport.dismiss();

   }


setDataView() {
  if(this.returnData()?.length > 0) this.resultsContact = this.returnData();
  else{
    this.allContact = [
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
    this.resultsContact = [...this.allContact];
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
