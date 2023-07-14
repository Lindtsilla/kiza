import { Component, Directive, ElementRef, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormArray, FormControl, FormGroup, FormsModule, NG_VALIDATORS, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {IonicModule, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";


declare const  window: any;
declare const  $: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ReactiveFormsModule]
})
export class SignupPage implements OnInit, AfterViewInit {

  // @ViewChild('phone') set phoneNumberElemt(el: ElementRef) {
  //   if (el) {
  //   }
  // }
  eye: boolean = false;
  private authService: AuthService = inject(AuthService);


  private loadingCtrl: LoadingController = inject(LoadingController);
  private router: Router = inject(Router);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);

  public userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    return (this.secondForm?.get('password')?.value === this.secondForm?.get('confirmPassword')?.value) ? null : { notSame: true }
    //  IonIntlTelInputValidators.phone
  }
  public secondForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required,
      ]),
      password: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z]+[0-9]+[`~!@#$%^&*()_+-=]*|[0-9]+[a-zA-Z]+[`~!@#$%^&*()_+-=]*|[`~!@#$%^&*()_+-=]*[a-zA-Z]+[0-9]+|[a-zA-Z]+[`~!@#$%^&*()_+-=]*[0-9]+)+(a-zA-Z]*[0-9]*[`~!@#$%^&*()_+-=]*|[0-9]*[a-zA-Z]*[`~!@#$%^&*()_+-=]*|[`~!@#$%^&*()_+-=]*[a-zA-Z]*[0-9]*|[a-zA-Z]*[`~!@#$%^&*()_+-=]*[0-9]+)*$')]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.checkPasswords
    }
  );




  public step = 1;

  public totalSteps = 2;

  public show: boolean = false;


  constructor() { }

  ngAfterViewInit() {

  }

  ngOnInit() {
    // this.utilsService.showSuccessToast("Hello daevin")
  }

  log(data:any){
    console.log(data)
  }

  // protected readonly assets = assets;




  public prevStep() {
    this.step--;
    if (this.step < 1) {
      this.step = 1;
    }

  }

  public progress() {
    return (this.step / this.totalSteps) * 100 + '%';
  }

  public nextStep() {
    if(this.userForm.valid){
      this.step++;
    }


  }

  prevRoute() {
    this.step--;
    if (this.step < 1) {
      this.step = 1;
      this.router.navigate(['auth/login']);
    }
  }

  public get phoneNumber(){
    return this.secondForm.get('phoneNumber')
  }
// (this.phoneNumber?.value as any)?.internationalNumber?.replaceAll(' ', '')

  async signUp() {

    const user: any = {
      ...this.userForm.value as any,
      name: `${this.userForm.value.firstName} ${this.userForm.value.lastName}`
    }
    const loading = await this.loadingCtrl.create({
      message: 'Registering User...',
      duration: 3000,
    });

    await loading.present();
    const registered = await this.authService.register(user);

    if(registered){
      this.router.navigate(['auth/login'])
    }

    await loading.dismiss();
    localStorage.setItem('myprofil', JSON.stringify(this.userForm))


  }



  nextFocus(index: number) {
    const nextIndex = index + 1;
    const nextInput =  document.getElementsByName(`${nextIndex}`)[0] as HTMLElement;
    nextInput.focus();
  }

  prevFocus(index: number) {
    const prevIndex = index - 1;
    const prevInput = document.getElementsByName(`${prevIndex}`)[0] as HTMLElement;
    prevInput.focus();
  }


  showPassword() {
    this.show = !this.show;
  }

  custumValidatorsPassword(control: AbstractControl) {

  }

  // first form

  public get firstName() {
    return this.userForm.get('firstName');
  }
  public get lastName() {
    return this.userForm.get('lastName');
  }
  public get email() {
    return this.userForm.get('email');
  }
  public get gender() {
    return this.userForm.get('gender');
  }

  // second form

  public get phoneNumbers() {
    return this.secondForm.get('phoneNumber');
  }
  public get password() {
    return this.secondForm.get('password');
  }
  public get confirmPassword() {
    return this.secondForm.get('confirmPassword');
  }

  seaEye() {
    this.eye = !this.eye;

  }
  //Error form on

  get FirstNameError() {
    return this.firstName?.hasError('required') ? 'FirstName is required' :
      this.firstName?.hasError('firstName') ? 'Name is invalid' : '';
  }

  get LastNameError() {
    return  this.lastName?.hasError('required') ? 'LastName is required' :
      this.lastName?.hasError('lastName') ? 'LastName is invalid' : '';
  }

  get EmailError() {
    return  this.email?.hasError('required') ? 'Email is required' :
      this.email?.hasError('email') ? 'Email is invalid' : '';
  }

  get GenderError() {
    return this.gender?.hasError('required') ? 'Gender is required' :
      this.gender?.hasError('gender') ? 'Gender is invalid' : '';
  }


  //Error form last

  get phoneNumberError() {
    return    this.phoneNumber?.hasError('required') ? 'Phone number is required' :
      this.phoneNumber?.hasError('phoneNumber') ? 'Phone number is invalid' : '';
  }

  get PasswordError() {
    return  this.password?.hasError('required') ? 'Password is required' :
      this.password?.hasError('pattern') ? 'Password is invalid' : '';
  }

  get ConfirmPasswordError() {
    return   this.confirmPassword?.hasError('required') ? 'Confirm password is required' :
      this.secondForm?.hasError('notSame') ? 'Please enter your new password' : '';
  }








}
