import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { LoginComponent } from './login/login.component';

import { PublicRoutingModule } from './public.routing';

import { AuthService } from '../auth.service';
import { LogoutComponent } from './logout/logout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PublicComponent } from './public.component';
import { FooterComponent } from './footer/footer.component';
import { LoginModalComponent } from './topbar/login-modal/login-modal.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		ModalModule.forRoot(),
    	BootstrapModalModule,

		PublicRoutingModule
	],
	declarations: [
		LoginComponent, 
		LogoutComponent, 
		TopbarComponent,
		FooterComponent,
		PublicComponent, 
		LoginModalComponent
	],
	providers: [AuthService],
	entryComponents: [LoginModalComponent]
})
export class PublicModule { }
