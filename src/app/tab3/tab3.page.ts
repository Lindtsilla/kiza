import { Component } from '@angular/core';
import {arrowForwardSharp, closeCircleOutline, informationCircle, language, logOut,} from "ionicons/icons";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: any;

  constructor() {}

  signout() {

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
