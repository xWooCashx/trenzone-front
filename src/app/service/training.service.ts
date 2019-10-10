import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Training} from '../class/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private trainingUrl: string;

  constructor(private http: HttpClient) {
    this.trainingUrl = 'https://trenzone-server.herokuapp.com/training';
  }

  public findAll(): Observable<Training[]> {
    return this.http.get<Training[]>(this.trainingUrl);
  }

  public save(training: Training) {
    return this.http.post<Training>(this.trainingUrl, training);
  }
}
