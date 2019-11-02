import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exercise} from '../class/exercise';
import {Activity} from '../class/activity';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private trainings: string;
  private exercises: string;

  constructor(private http: HttpClient) {
    this.trainings = 'https://trenzone-server.herokuapp.com/training/';
    this.exercises = 'exercises';
  }

  public getExercises(trainingId): Observable<Activity[]> {
    console.log('getting activities:', this.trainings + trainingId + '/' + this.exercises);
    return this.http.get<Activity[]>(this.trainings + trainingId + '/' + this.exercises);
  }

  public save(exercises: Activity[], trainingId): Observable<Activity[]> {
    console.log('saving excercies');
    console.log('excercises:', JSON.stringify(exercises));
    console.log('trainingId:', trainingId);
    return this.http.post<Activity[]>(this.trainings + trainingId + '/' + this.exercises, exercises);
  }
}
