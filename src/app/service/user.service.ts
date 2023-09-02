import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  listUsers() : Observable<any>{
    return this.http.get<any>(AppConstants.urlApiUsers)
  }

  deleteUserById(id: Number) : Observable<any>{
    return this.http.delete(AppConstants.urlApiUsers + id, {responseType : 'json'});
  }

  getUserById(id: Number): Observable<any> {
    return this.http.get<any>(AppConstants.urlApiUsers + id, { responseType: 'json' }).pipe(
      catchError((error: any) => {
        // Você pode lidar com o erro aqui, se necessário, ou simplesmente passar adiante.
        return throwError(error); // Lança a resposta de erro original da API.
      })
    );
  }

}
