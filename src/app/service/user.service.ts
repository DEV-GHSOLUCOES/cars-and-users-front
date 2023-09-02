import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

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

}
