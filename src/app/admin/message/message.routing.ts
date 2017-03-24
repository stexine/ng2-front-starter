import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MessageComponent } from './message.component';
import { InboxComponent } from './inbox/inbox.component';
import { ViewComponent } from './view/view.component';
import { SentComponent } from './sent/sent.component';
import { ComposeComponent } from './compose/compose.component';


const routes: Routes = [
    { 
        path: '', 
        component: MessageComponent,
        children: [
            { path: 'inbox', component: InboxComponent },
            { path: 'view/:id', component: ViewComponent },
            { path: 'sent', component: SentComponent },
            { path: 'compose', component: ComposeComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MessageRoutingModule { }