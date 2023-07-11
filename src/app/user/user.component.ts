import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { UserRecord } from '../model/User';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
   styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user: UserRecord = new UserRecord();
  navigationSubscription: any;
  now: number = Date.now();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getUser();
        this.now = Date.now();
      }
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.userService.getUser(id).subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
