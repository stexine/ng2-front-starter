import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './public/welcome/welcome.component';
import { TestComponent } from './test/test.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';

import AppGlobalErrorHandler from './app-global-error-handler';
import { PersonService } from './test/person.service';
import { AppGlobalService } from './app-global.service';


@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		TestComponent,
		NotFound404Component
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		SlimLoadingBarModule,
		AdminModule,
		PublicModule,
		AppRoutingModule,
	],
	bootstrap: [AppComponent],
	providers: [AppGlobalService, PersonService, {provide: ErrorHandler, useClass: AppGlobalErrorHandler}]
})
export class AppModule { }
