import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicComponent } from './public/public.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  //{ path: 'admin', redirectTo: 'admin', pathMatch: 'full' },
  //{ path: '/admin', redirectTo: 'admin', pathMatch: 'full'},
  //{ path: '/public/welcome', component: WelcomeComponent},
  //{ path: '', component: PublicComponent },
  { path: 'test', component: TestComponent },
  { path: '**', component: NotFound404Component }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}