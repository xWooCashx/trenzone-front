import {Component, OnInit} from '@angular/core';
import {User} from '../../class/user';
import {AdminServiceService} from '../../service/admin-service.service';
import {UserServiceService} from '../../service/user-service.service';
import {Comment} from '../../class/Comment';
import {Content} from '../../class/TrainingsSearchResult';
import {TrainingService} from '../../service/training.service';
import {DeleteTrainingModalComponent} from '../training/delete-training-modal/delete-training-modal.component';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CommentService} from '../../service/comment.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  allUsers: User[];
  users: User[];
  query = '';
  selectedUserName = '';
  userComments: Comment[];
  userTrainings: Content[];
  loading = false;

  constructor(public adminService: AdminServiceService, public userService: UserServiceService,
              public trainingService: TrainingService, public toastService: ToastrService,
              public dialog: MatDialog, public commentService: CommentService) {
    this.users = [];
    this.adminService.getAllAccounts().subscribe(value => {
      console.log('accounts found');
      this.allUsers = value;
      this.users = this.allUsers;
      console.log(this.allUsers.length);
    }, error => {
      console.log('Cant get accounts');
    });
  }

  ngOnInit() {
  }

  search() {
    this.users = this.allUsers.filter(value => {
      return value.username.includes(this.query);
    });
  }

  getAccountDetails(username: string) {
    this.selectedUserName = username;
  }

  changeUser(username: string) {
    this.loading = true;
    console.log(username, 'finding details');
    this.userService.findAllCommentsForAccount(username)
      .subscribe(value => this.userComments = value);
    this.userService.getUserTrainings(username).subscribe(value => {
      console.log(value);
      this.userTrainings = value;
      this.loading = false;
      console.log(username, '+', value);
    });
    // this.userService.getUserDetails(username);
  }

  deleteTraining(username: string, id: number) {
    const dialogRef = this.dialog.open(DeleteTrainingModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.delete(this.userTrainings[id].id + '', username).subscribe(value => {
          this.toastService.info(this.userTrainings[id].name, 'Deleted', {positionClass: 'toast-top-center'});
          this.userTrainings.splice(id, 1);
        });
      }
    });
  }

  deleteComment(username: string, i: number) {
    this.commentService.deleteComment(this.userComments[i].id).subscribe(value => {
      this.userComments.splice(i, 1);
      this.toastService.info(username + '\'s comment', 'Deleted', {positionClass: 'toast-top-center'});
    });
  }
}
