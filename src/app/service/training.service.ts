import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Training} from '../class/training';
import {Pageable, TrainingsSearchResult} from '../class/TrainingsSearchResult';
import {Comment} from '../class/Comment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private trainingUrl: string;
  private accountUrl: string;
  private commentsUrl: string;
  private paramsAsString: string;
  private trainingUrlSave: string;
  private TRENZONE_URL: string;

  constructor(private http: HttpClient) {
    this.TRENZONE_URL = 'https://trenzone-server.herokuapp.com/';
    this.trainingUrl = 'trainings';
    this.accountUrl = 'account/';
  }

  public findAll(): Observable<TrainingsSearchResult> {
    return this.http.get<TrainingsSearchResult>(this.trainingUrl);
  }

  public getTrainings(pageSize, pageNumber): Observable<TrainingsSearchResult> {
    return this.http.get<TrainingsSearchResult>(this.TRENZONE_URL + this.trainingUrl +
      this.addParams(new Map<string, string>().set('size', pageSize).set('page', pageNumber)));
  }

  public getTraining(trainingID): Observable<Training> {
    return this.http.get<Training>(this.TRENZONE_URL + this.trainingUrl + '/' + trainingID);
  }

  public save(training: Training): Observable<Training> {
    return this.http.post<Training>(this.TRENZONE_URL +
      this.accountUrl + training.username + '/' +
      this.trainingUrl, training);
  }

  public update(training: Training): Observable<Training> {
    return this.http.put<Training>(this.TRENZONE_URL +
      this.accountUrl + training.username + '/' +
      this.trainingUrl + '/' + training.id, training);
  }

  delete(id: string, username: string): Observable<string> {
    return this.http.delete<string>(this.TRENZONE_URL +
      this.accountUrl + username + '/' +
      this.trainingUrl + '/' + id);
  }

  publish(id: string, username: string): Observable<string> {
    return this.http.get<string>(this.TRENZONE_URL +
      this.accountUrl + username + '/' +
      this.trainingUrl + '/' + id + '/publish');
  }

  getUserTraining(username: string): Observable<Training[]> {
    return this.http.get<Training[]>(this.TRENZONE_URL +
      this.accountUrl + username + '/' +
      this.trainingUrl);
  }

  getComments(trainingId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.TRENZONE_URL + 'training/'
      + trainingId + '/comments');
  }

  private addParams(params: Map<string, string>): string {
    this.paramsAsString = '?';
    params.forEach((value, key) => {
      this.paramsAsString += key + '=' + value + '&';
    });
    return this.paramsAsString;
  }

}
