import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {arrowForwardSharp, closeCircleOutline, informationCircle, language, logOut,} from "ionicons/icons";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],

})
export class Tab3Page {
  user: any;
  private authService: AuthService = inject(AuthService);

  userForm:any={
    firstName: 'daevin',
    lastName: '',
    email: '',
    gender: '',
  }


  constructor(

  ) {
    console.log(this.userForm)
  }
  async ngOnInit() {
    await this.getprofile();
    console.log(this.userForm)
  }

 async getprofile() {
    this.userForm = await this.authService.getUser()
   console.log(this.userForm)
  }

  protected readonly logOut = logOut;
  protected readonly arrowForwardSharp = arrowForwardSharp;
  protected readonly closeCircleOutline = closeCircleOutline;

  redictTo(redirect: any) {

  }

  protected readonly  menu = [
    {
      avatar: language,
      linkLabel: 'Langue',
      icon: arrowForwardSharp,
      redirect: '/config-lang',

    },
    {
      avatar: informationCircle,
      linkLabel: 'Aide',
      icon: arrowForwardSharp,
      redirect: '/faq',

    },


  ]
}
