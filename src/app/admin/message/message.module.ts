import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { Ng2PaginationModule } from 'ng2-pagination';

import { MessageRoutingModule } from './message.routing';

import { ComposeComponent } from './compose/compose.component';
import { SentComponent } from './sent/sent.component';
import { ViewComponent } from './view/view.component';
import { InboxComponent } from './inbox/inbox.component';
import { FolderWidgetComponent } from './folder-widget/folder-widget.component';
import { MessageComponent } from './message.component';
import { TinyEditorComponent } from '../../tiny-editor/tiny-editor.component';
import { MessageListComponent } from './message-list/message-list.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SelectModule,
		MessageRoutingModule,
		Ng2PaginationModule
	],
	declarations: [
		ComposeComponent, 
		SentComponent,
		ViewComponent, 
		InboxComponent, FolderWidgetComponent, MessageComponent, TinyEditorComponent, MessageListComponent
	],
	providers: []
})
export class MessageModule { }
