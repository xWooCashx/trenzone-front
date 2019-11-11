import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  url = 'https://trenzone-server.herokuapp.com/account/';

  constructor(public http: HttpClient) {

  }

  getAchievementsForTraining(username, trainingId): Observable<string> {
    console.log(username, trainingId);
    return this.http.get<string>(this.url + username + '/actives/' + trainingId + '/achievements');
  }
}
