import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../class/user';
import {Content, TrainingsSearchResult} from '../class/TrainingsSearchResult';
import {ActivatedTraining, ActiveTrainings} from '../class/ActivatedTraining';
import {TrainersSearchResult} from '../class/TrainersSearchResult';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userURL = 'https://trenzone-server.herokuapp.com/accounts/';
  userURL2 = 'https://trenzone-server.herokuapp.com/account/';
  userURL3 = 'https://trenzone-server.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  public getUserDetails(username): Observable<User> {
    return this.http.get<User>(this.userURL + username);
  }

  public getUserTrainings(username): Observable<Content[]> {
    return this.http.get<Content[]>(this.userURL2 + username + '/trainings');
  }

  public getUserActiveTrainings(username): Observable<ActiveTrainings> {
    return this.http.get<ActiveTrainings>(this.userURL2 + username + '/actives');
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

  public activateTraining(id, username): Observable<ActivatedTraining> {
    return this.http.post<ActivatedTraining>(this.userURL2 + username + '/actives/' + id,
      {});
  }

  public deactivateTraining(id, username): Observable<string> {
    return this.http.delete<string>(this.userURL2 + username + '/actives/' + id);
  }

  public findAllCommentsForAccount(id): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.userURL2 + id + '/comments');
  }

  public getTrainers(queryText: string): Observable<TrainersSearchResult> {
    return this.http.get<TrainersSearchResult>(this.userURL3 + 'trainers?name=' + queryText);
  }
}
