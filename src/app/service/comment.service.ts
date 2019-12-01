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
    this.commentsUrl = 'https://trenzone-server.herokuapp.com/';
  }

  public getCommentsForTraining(trainingId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl + 'training/' + trainingId + '/comments');
  }

  public postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl + 'comment', comment);
  }

  public deleteComment(id): Observable<string> {
    return this.http.delete<string>(this.commentsUrl + 'comment/' + id);
  }
}
