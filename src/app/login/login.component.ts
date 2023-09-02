import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {login: '', password: ''}

  constructor(private loginService: LoginServiceService){}

  public login(){
   this.loginService.login(this.user);
  }

  ngOnInit(): void {
  }

}
