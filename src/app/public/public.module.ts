import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

import { PublicRoutingModule } from './public.routing';

import { AuthService } from '../auth.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		PublicRoutingModule
	],
	declarations: [LoginComponent, LogoutComponent],
	providers: [AuthService]
})
export class PublicModule { }
