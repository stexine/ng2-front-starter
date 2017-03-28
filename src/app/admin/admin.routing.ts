import { Routes, RouterModule }  from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../auth.guard';

import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'account', loadChildren: './account/account.module#AccountModule' },
            { path: 'message', loadChildren: './message/message.module#MessageModule' },
            { path: 'chat', loadChildren: './chat/chat.module#ChatModule' },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class AdminRoutingModule { }
