import { Component, ViewContainerRef } from '@angular/core';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { AppGlobalService } from '../../app-global.service';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../shared/notification.service';

import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-public-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  constructor(private _gs: AppGlobalService, private _auth: AuthService, private _notice: NotificationService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openLoginModal() {
    return this.modal.open(LoginModalComponent,  overlayConfigFactory({}, BSModalContext));
  }

  logout() {
    this._auth.logout();
  }

}
