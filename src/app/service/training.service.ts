import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Training} from '../class/training';
import {Pageable, TrainingsSearchResult} from '../class/TrainingsSearchResult';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private trainingUrl: string;
  private paramsAsString: string;

  constructor(private http: HttpClient) {
    this.trainingUrl = 'https://trenzone-server.herokuapp.com/trainings';
  }

  public findAll(): Observable<TrainingsSearchResult> {
    return this.http.get<TrainingsSearchResult>(this.trainingUrl);
  }

  public getTrainings(pageSize, pageNumber): Observable<TrainingsSearchResult> {
    return this.http.get<TrainingsSearchResult>(this.trainingUrl +
      this.addParams(new Map<string, string>().set('size', pageSize).set('page', pageNumber)));
  }

  public getTraining(trainingID): Observable<Training> {
    return this.http.get<Training>(this.trainingUrl + '/' + trainingID);
  }

  public save(training: Training) {
    return this.http.post<Training>(this.trainingUrl, training);
  }

  private addParams(params: Map<string, string>): string {
    this.paramsAsString = '?';
    params.forEach((value, key) => {
      this.paramsAsString += key + '=' + value + '&';
    });
    return this.paramsAsString;
  }
}
