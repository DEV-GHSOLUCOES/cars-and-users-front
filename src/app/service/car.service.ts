import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getListCar() : Observable<any>{
    return this.http.get<any>(AppConstants.urlApiCars);
  }
}
