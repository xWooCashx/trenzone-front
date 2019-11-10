import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userURL = 'https://trenzone-server.herokuapp.com/accounts/';

  constructor(private http: HttpClient) {
  }

  public getUserDetails(username): Observable<User> {
    return this.http.get<User>(this.userURL + username);
  }

  public getUserTrainings(username): Observable<User> {
    return this.http.get<User>(this.userURL + username + '/trainings');
  }

  public getUserActiveTrainings(username): Observable<User> {
    return this.http.get<User>(this.userURL + username + '/actives');
  }

  // public getUserDetails(username): Observable<User> {
  //   return this.http.get<User>(this.userURL + username);
  // }
}
