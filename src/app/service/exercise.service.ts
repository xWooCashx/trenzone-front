import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exercise} from '../class/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exerciseUrl: string;

  constructor(private http: HttpClient) {
    this.exerciseUrl = 'http://localhost:8080/exercise';
  }

  public findAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.exerciseUrl);
  }

  public save(exercise: Exercise) {
    return this.http.post<Exercise>(this.exerciseUrl, exercise);
  }

  public delete(id: string) {
    return this.http.delete(this.exerciseUrl + '/' + id);
  }
}
