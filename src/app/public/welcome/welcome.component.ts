import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private _notice: NotificationService) { }

  ngOnInit() {
  }

  shownow() {
    console.log(this._notice.notifications);
  }

}
