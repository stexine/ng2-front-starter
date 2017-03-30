import { Routes, RouterModule }  from '@angular/router';
import { NgModule } from '@angular/core';

import { MarketComponent } from './market.component';


const routes: Routes = [
    {
        path: 'm',
        component: MarketComponent,
        children: [
            { path: '', loadChildren: './account/account.module#AccountModule' }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class MarketRoutingModule {}