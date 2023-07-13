import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertController, IonicModule, isPlatform, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {Capacitor} from "@capacitor/core";
import {AuthService} from "../../services/auth.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class LoginPage implements OnInit {

  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private alertController: AlertController = inject(AlertController);

  private authService: AuthService = inject(AuthService);
  private loadingCtrl: LoadingController = inject(LoadingController);

  public show: boolean = false;

  public platform = Capacitor.getPlatform();

  public authForm = new FormGroup(
    {
      email: new FormControl('',[ Validators.email, Validators.required]),
      password: new FormControl('',[ Validators.required,
       // Validators.pattern('^([a-zA-Z]+[0-9]+[`~!@#$%^&*()_+-=]*|[0-9]+[a-zA-Z]+[`~!@#$%^&*()_+-=]*|[`~!@#$%^&*()_+-=]*[a-zA-Z]+[0-9]+|[a-zA-Z]+[`~!@#$%^&*()_+-=]*[0-9]+)+(a-zA-Z]*[0-9]*[`~!@#$%^&*()_+-=]*|[0-9]*[a-zA-Z]*[`~!@#$%^&*()_+-=]*|[`~!@#$%^&*()_+-=]*[a-zA-Z]*[0-9]*|[a-zA-Z]*[`~!@#$%^&*()_+-=]*[0-9]+)*$')
      ]),
    }
  );

  public get email() {
    return this.authForm.get('email');
  }

    public get password() {
        return this.authForm.get('password');
    }


    // get email validation error

    public get emailError() {
        return this.email?.hasError('required') ? 'Email is required' :
            this.email?.hasError('email') ? 'Email is invalid' : '';
    }


    // get password validation error

  public get passwordError() {
      return this.password?.hasError('required') ? 'Password is required' :
          this.password?.hasError('pattern') ? 'Password is invalid' : '';
  }

  private returnUrl : string = '';

  eye: boolean = false;

  constructor(private router: Router) {
    this.activeRoute.queryParams.subscribe(async (params) => {
      if(params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }else{
              this.returnUrl = '/layout/home';
      }
    })
  }

  ngOnInit() {

  }

  seaEye() {
    this.eye = !this.eye;

  }

  prevRoute() {
   this.router.navigate(['auth/singup']);
  
  }

   async login(){
      const {email, password} = this.authForm.value as {email: string, password: string};
      console.log(this.authForm.value)
     const loading = await this.loadingCtrl.create({
       message: 'Connexion en cour...',
       duration: 3000,
     });

     await loading.present();
     const signedIn = await this.authService.login(email, password);

     if(signedIn){
       this.router.navigate(['tabs/tab1'])
     }

     await loading.dismiss();

   }

  async moveTo(url: string){
    await this.router.navigate([url], {
      queryParams: {
        returnUrl: this.returnUrl,
      },
      replaceUrl: true,
    })
  }

}
