import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Comment} from '../class/Comment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl: string;

  constructor(private http: HttpClient) {
    this.commentsUrl = 'https://trenzone-server.herokuapp.com/comments';
  }

  public getCommentsForTraining(trainingId: string): Observable<Comment[]> {
    console.log('url for comments:', this.commentsUrl + '?training=' + trainingId);
    return this.http.get<Comment[]>(this.commentsUrl + '?training=' + trainingId);
  }

  public postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment);
  }
}
