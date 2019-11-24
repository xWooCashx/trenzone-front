import {Component, Input, OnInit} from '@angular/core';
import {TrainingService} from '../../../service/training.service';
import {Comment} from '../../../class/Comment';
import {CommentService} from '../../../service/comment.service';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-training-comments',
  templateUrl: './training-comments.component.html',
  styleUrls: ['./training-comments.component.css']
})
export class TrainingCommentsComponent implements OnInit {
  @Input()
  trainingId: string;
  public comments: Comment[];
  public newComment;

  constructor(private service: CommentService, private authenticationService: AuthenticationService) {
    this.newComment = {
      trainingId: this.trainingId,
      content: '',
      username: this.authenticationService.getUsername(),
      date: null,
    };
  }

  ngOnInit() {
    this.service.getCommentsForTraining(this.trainingId)
      .subscribe(value => this.comments = value.sort((a, b) => {
        return a < b ? 1 : -1;
      }));

  }

  sendComment() {
    if (this.newComment.content) {
      this.newComment.trainingId = this.trainingId;
      console.log(JSON.stringify(this.newComment));
      this.service.postComment(this.newComment).subscribe(value => {
        this.comments.unshift(value);
        this.newComment.content = '';
      }, error => console.log(error));
    }
  }
}
