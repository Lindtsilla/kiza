import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router: Router = inject(Router);
  constructor() { }


  getUser(){
    return JSON.parse(localStorage.getItem('user') as string) || null;
  }
  register(user: any){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        localStorage.setItem("user", JSON.stringify(user))
        resolve(true)
      }, 1000)
    })
  }

  login(email: string, password: string){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        let user = this.getUser();

        if(user && email === user?.email  && password === user?.password){
          console.log(user)
          resolve(true)
        }
        else{
          console.log("error")
          reject(false)
        }

      }, 1000)
    })

  }

  logout(){
      setTimeout(()=>{
        localStorage.clear()
        this.router.navigate(['auth/login'])
      }, 1000)
  }

}
