import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rating} from '../class/rating';


@Injectable({
  providedIn: 'root'
})
export class RatingService {
  ratingULR = 'https://trenzone-server.herokuapp.com/rate';

  constructor(public http: HttpClient) {

  }

  postRating(training, userName, rating) : Observable<Rating> {
    return this.http.post<Rating>(this.ratingULR, {
      trainingId: training,
      rate: rating,
      username: userName
    });
  }
}
