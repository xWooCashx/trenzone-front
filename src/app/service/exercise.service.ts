import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exercise} from '../class/exercise';
import {Activity} from '../class/activity';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exerciseUrl: string;

  constructor(private http: HttpClient) {
    this.exerciseUrl = 'https://trenzone-server.herokuapp.com/exercises';
  }

  public getExercises(trainingId): Observable<Activity[]> {
    console.log(this.exerciseUrl + '?training=' + trainingId);
    return this.http.get<Activity[]>(this.exerciseUrl + '?training=' + trainingId);
  }

  public save(exercises: Activity[], trainingId): Observable<Activity[]> {
    console.log('saving excercies');
    console.log('excercises:', JSON.stringify(exercises));
    console.log('trainingId:', trainingId);
    return this.http.post<Activity[]>(this.exerciseUrl + '/' + trainingId, exercises);
  }

  public delete(id: string) {
    return this.http.delete(this.exerciseUrl + '/' + id);
  }
}
