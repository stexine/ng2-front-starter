import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SelectModule } from 'ng2-select';

import { MessageRoutingModule } from './message.routing';

import { ComposeComponent } from './compose/compose.component';
import { SentComponent } from './sent/sent.component';
import { ViewComponent } from './view/view.component';
import { InboxComponent } from './inbox/inbox.component';
import { FolderWidgetComponent } from './folder-widget/folder-widget.component';
import { MessageComponent } from './message.component';
import { TinyEditorComponent } from '../../tiny-editor/tiny-editor.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MultiselectDropdownModule,
		SelectModule,
		MessageRoutingModule
	],
	declarations: [
		ComposeComponent, 
		SentComponent,
		ViewComponent, 
		InboxComponent, FolderWidgetComponent, MessageComponent, TinyEditorComponent
	],
	providers: []
})
export class MessageModule { }
