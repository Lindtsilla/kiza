import {enableProdMode, importProvidersFrom} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter, RouteReuseStrategy} from "@angular/router";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {HttpClientModule} from "@angular/common/http";

import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {

  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),

    importProvidersFrom(HttpClientModule)
  ]
}
)


