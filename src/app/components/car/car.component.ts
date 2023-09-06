import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private carService: CarService) { }

  cars!: Car[];
  id!: number; 
  searchSuccess: boolean = true;

  errorMessage: string  = '';
  

  ngOnInit(): void {
    this.carService.listCars().subscribe(data=> {
      this.cars = data;
    });
  }

  deleteCarById(id : Number){
    this.errorMessage = ''; // Limpa a mensagem de erro antes da nova consulta
    if (confirm('Deseja mesmo excluir')) {
      
    this.carService.deleteCarById(id).pipe(
      catchError((error: any) => {
        // Lida com o erro aqui e configura a mensagem de erro
        return this.errorMessage = error.error[0].message || 'Erro ao deletar Carro.';
          
      })
    
    ) .subscribe(data => {
      console.log("retorno do metodo delete : " + data);

      this.carService.listCars().subscribe(data=> {
        this.cars =  data;
      });

    });
  }
  }


  getCarById() {
    this.errorMessage = ''; // Limpa a mensagem de erro antes da nova consulta
    this.carService.getCarById(this.id).pipe(
      catchError((error: any) => {
        // Lida com o erro aqui e configura a mensagem de erro
        this.searchSuccess =  false; 
        return this.errorMessage = error.error[0].message || 'Erro desconhecido ao buscar Carro.';
      })
    ).subscribe(data => {
      // Lida com a resposta com sucesso aqui
      this.cars = [data];
    });
  }


}
