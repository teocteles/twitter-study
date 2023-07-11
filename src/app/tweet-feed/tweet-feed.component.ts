import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { UserRecord } from '../model/User';
import { TweetService } from '../tweet/tweet.service';
import { UserService } from '../user/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
  styleUrls: ['./tweet-feed.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          opacity: 1
        })
      ),
      state(
        'closed',
        style({
          opacity: 0
        })
      ),
      transition('open => closed', [animate('2s')]),
      transition('closed => open', [animate('1s')])
    ])
  ]
})
export class TweetFeedComponent implements OnInit, OnDestroy {
  tweets: any[] = [];
  isOpen = false;
  hide = true;
  user: UserRecord;
  newTweet: any;
  navigationSubscription: any;

  texto: string = '';
  textoControl: FormControl;
  caracteresRestantes: number = 130;
  limiteCaracteres: number = 130;


  constructor(
    public tweetService: TweetService,
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getTweets();
        this.getUser();
      }
    });
    this.textoControl = new FormControl('', Validators.maxLength(this.limiteCaracteres));
    this.textoControl.valueChanges.subscribe(value => {
      this.caracteresRestantes = this.limiteCaracteres - value.length;
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getTweets();
  }

  getTweets(): void {
    this.tweets = this.tweetService.listarTweets();
  }

  atualizarContador() {
    this.caracteresRestantes = 130 - this.texto.length;
    if(this.caracteresRestantes == 0)
      return;
  }

  getUser(): void {
    const idKey = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(idKey).subscribe((user) => {
      this.user = user;
    });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.hide = !this.hide;
  }

  add(tweetText: string) {
    if(tweetText === '' || tweetText == null)
      return false;

    this.newTweet = {
      id: Math.floor(Math.random() * 9999),
      created: Date.now(),
      user: this.user,
      tweetText: tweetText
    }

    this.tweetService.criarTweet(this.newTweet);
    this.getTweets();
    this.caracteresRestantes = 130;
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


}
