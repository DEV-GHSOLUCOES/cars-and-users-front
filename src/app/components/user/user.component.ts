import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users!: User[];

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

}
