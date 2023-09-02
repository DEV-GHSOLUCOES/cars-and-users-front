import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

login(user: any){
  
   return this.http.post(AppConstants.urlApiLogin, JSON.stringify(user)).subscribe(data  => {

    var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
    localStorage.setItem("token", token);

    console.info("token " + localStorage.getItem("token"))

    this.router.navigate(['home']);
    localStorage.clear;
   }, 

    error => {
       console.error("Erro ao fazer login");
       alert('Acesso Negado!');
    }
   
   );
}



}
