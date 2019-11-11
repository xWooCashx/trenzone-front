import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../class/user';
import {TrainingsSearchResult} from '../class/TrainingsSearchResult';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userURL = 'https://trenzone-server.herokuapp.com/accounts/';
  userURL2 = 'https://trenzone-server.herokuapp.com/account/';

  constructor(private http: HttpClient) {
  }

  public getUserDetails(username): Observable<User> {
    return this.http.get<User>(this.userURL + username);
  }

  public getUserTrainings(username): Observable<TrainingsSearchResult> {
    return this.http.get<TrainingsSearchResult>(this.userURL2 + username + '/trainings');
  }

  public getUserActiveTrainings(username): Observable<User> {
    return this.http.get<User>(this.userURL + username + '/actives');
  }

  // public getUserDetails(username): Observable<User> {
  //   return this.http.get<User>(this.userURL + username);
  // }
  updateDetail(user: User): Observable<User> {
    return this.http.put<User>(this.userURL + user.id, user);
  }

  saveUserDetails(user: User): Observable<User> {
    return this.http.post<User>(this.userURL, user);
  }
}
