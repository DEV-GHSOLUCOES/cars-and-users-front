import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-cadastro',
  templateUrl: './car-cadastro.component.html',
  styleUrls: ['./car-cadastro.component.css']
})
export class CarCadastroComponent implements OnInit {

  car = new Car();
  errorMessage: string  = '';
  messageSuccess: string  = '';

  constructor(private  router: ActivatedRoute, private carService: CarService) { }

  ngOnInit(): void {
    let id  =  this.router.snapshot.paramMap.get('id');

    if (id !== null) {
      const carId = Number(id);
      console.log("valor sendo editado : " + id);
      this.carService.getCarById(carId).subscribe(data =>{
        this.car = data;
      })
    }

  }

  salvarCarro(car: Car){
   
    //Atualizando carro 
    if (this.car.id != null && this.car.id.toString().trim() != null) {
      this.carService.updateCarById(this.car.id, this.car).subscribe(
        data => {
          this.cleanCar();
          console.info(" carro ataualizado: " + data); 
          this.messageSuccess = "carro atualizado com sucesso!"
      },
      error => {
        console.error("Erro ao atualizar o carro:", error);
        return this.errorMessage = error.error[0].message ;
     
      }
      
      );
    }
    else{

      //Salvando um novo carro
      this.carService.createCar(this.car).subscribe(
        data => {
          this.cleanCar();
          console.info("gravou user: " + data);
          this.messageSuccess = "Carro salvo com Sucesso!"
      },
      error => {
        console.error("Erro ao atualizar o carro:", error);
        return this.errorMessage = error.error[0].message ;
     
      }
      );
    }
  }

  cleanCar(){
    this.car = new Car();
      this.errorMessage = '';
    this.messageSuccess = '';
  }

  

}
