import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  url = 'https://trenzone-server.herokuapp.com/accounts';

  constructor(public http: HttpClient) {

  }

  getAllAccounts(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
