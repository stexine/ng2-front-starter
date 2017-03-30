import { Routes, RouterModule }  from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicComponent } from './public.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            { path: 'welcome', component: WelcomeComponent}
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PublicRoutingModule { }