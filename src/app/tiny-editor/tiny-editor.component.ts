import {
	Component,
	AfterViewInit,
	EventEmitter,
	OnDestroy,
	Input,
	Output
} from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';

declare var tinymce: any;

@Component({
	selector: 'app-tiny-editor',
	templateUrl: './tiny-editor.component.html',
	styleUrls: ['./tiny-editor.component.css']
})

export class TinyEditorComponent implements AfterViewInit, OnDestroy {

	@Input() elementId: String;
	@Output() onEditorContentChange = new EventEmitter();

	editor;

	ngAfterViewInit() {
		tinymce.init({
			selector: '#' + this.elementId,
			height: 100,
			menubar: false,
			plugins: [
				'advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table contextmenu paste code'
			],
			toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code searchreplace media',
			skin_url: '/assets/tinymce/skins/lightgray',
			setup: editor => {
				this.editor = editor;
				editor.on('blur', () => {
					const content = editor.getContent();
					this.onEditorContentChange.emit(content);
				});
			}
		});
	}

	ngOnDestroy() {
		tinymce.remove(this.editor);
	}

}
