import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users!: User[];
  id!: number;

  errorMessage: string  = '';
  

  constructor(private userService: UserService) { 

  }

  ngOnInit(): void {
    this.userService.listUsers().subscribe(data=> {
      this.users =  data;
    });
  }

  deleteUserById(id : Number){
    this.userService.deleteUserById(id).subscribe(data => {
      console.log("retorno do metodo delete : " + data);

      this.userService.listUsers().subscribe(data=> {
        this.users =  data;
      });

    });
  }

  getUserById() {
    this.errorMessage = ''; // Limpa a mensagem de erro antes da nova consulta
    this.userService.getUserById(this.id).pipe(
      catchError((error: any) => {
        // Lida com o erro aqui e configura a mensagem de erro
        this.errorMessage = error.error[0].message || 'Erro desconhecido ao buscar usuário.';
        return throwError(error); // Rejeita o erro para que o próximo manipulador possa lidar com ele, se necessário.
      })
    ).subscribe(data => {
      // Lida com a resposta com sucesso aqui
      this.users = [data];
    });
  }
}