import { Component, Input, OnInit } from '@angular/core';

import { UserRecord } from '../model/User';
import { UserService } from '../user/user.service';
import { TweetService } from './tweet.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet: any;
  @Input() index: number;
  user: UserRecord = new UserRecord();
  now: number = Date.now();

  constructor(
    private userService: UserService,
    public tweetService: TweetService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUser();
    this.tweetService.listarTweets();
  }

  getUser(): void {
    this.userService
      .getUser(this.tweet.userId)
      .subscribe((user) => (this.user = user));
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmação',
        message: 'Tem certeza de que deseja excluir este item?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.tweetService.deletarTweet(index);
        location.reload();
      }
    });

  }
}
