import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  listCars() : Observable<any>{
    return this.http.get<any>(AppConstants.urlApiCars, {responseType : 'json'}).pipe(
      catchError((error: any) => {
        return throwError(error); // Lança a resposta de erro original da API.
       })
     );
  }

  deleteCarById(id: Number) : Observable<any>{
    return this.http.delete(AppConstants.urlApiCars + id, {responseType : 'json'}).pipe(
      catchError((error: any) => {
        return throwError(error); // Lança a resposta de erro original da API.
       })
     );
  }

  getCarById(id: Number): Observable<any> {
    return this.http.get<any>(AppConstants.urlApiCars + id, { responseType: 'json' }).pipe(
      catchError((error: any) => {
          return throwError(error); // Lança a resposta de erro original da API.
      })
    );
  }

  createCar(car: Car) : Observable<any>{
    return this.http.post<any>(AppConstants.urlApiCars, car, {responseType : 'json'}).pipe(
      catchError((error: any) => {
        return throwError(error); // Lança a resposta de erro original da API.
       })
     );
  }

  updateCarById( id: Number, car: Car) : Observable<any>{
    return this.http.put<any>(`${AppConstants.urlApiCars}${id}`, car, { responseType: 'json' }).pipe(
      catchError((error: any) => {
        return throwError(error); // Lança a resposta de erro original da API.
       })
     );
  }

}
