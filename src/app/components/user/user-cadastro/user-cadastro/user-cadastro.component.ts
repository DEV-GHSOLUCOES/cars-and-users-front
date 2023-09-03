import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/model/car';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './user-cadastro.component.html',
  styleUrls: ['./user-cadastro.component.css']
})
export class UserCadastroComponent implements OnInit {

   user = new User();

  constructor(private  router: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    let id  =  this.router.snapshot.paramMap.get('id');

    if (id !== null) {
      const userId = Number(id);
      console.log("valor sendo editado : " + id);
      this.userService.getUserById(userId).subscribe(data =>{
        this.user = data;
      })
    }

  }

  salvarUser(user: User){
    //Atualizando user 
    if (this.user.id != null && this.user.id.toString().trim() != null) {
      this.userService.updateUserById(this.user.id, this.user).subscribe(data => {
        this.cleanUser();
        console.info(" user ataualizado: " + data); 
      });
    }
    else{
      //Salvando um novo user
      this.userService.createUser(this.user).subscribe(data => {
        this.cleanUser();
        console.info("gravou user: " + data);
      });
    }
  }

  cleanUser(){
    this.user = new User();
     this.user.cars = [new Car()];
  }

}
