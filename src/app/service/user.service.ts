import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  listUsers() : Observable<any>{
    return this.http.get<any>(AppConstants.urlApiUsers, {responseType : 'json'});
  }

  deleteUserById(id: Number) : Observable<any>{
    return this.http.delete(AppConstants.urlApiUsers + id, {responseType : 'json'});
  }

  getUserById(id: Number): Observable<any> {
    return this.http.get<any>(AppConstants.urlApiUsers + id, { responseType: 'json' }).pipe(
      catchError((error: any) => {
          return throwError(error); // Lança a resposta de erro original da API.
      })
    );
  }

  createUser(user: User) : Observable<any>{
    return this.http.post<any>(AppConstants.urlApiUsers, user, {responseType : 'json'});
  }

  updateUserById( id: Number, user: User) : Observable<any>{
    return this.http.put<any>(`${AppConstants.urlApiUsers}${id}`, user, { responseType: 'json' });
  }
}
