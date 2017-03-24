import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { AppGlobalService } from '../../../app-global.service';
import { Profile, ProfileService } from '../../shared/profile.service';
import { User } from '../../../shared/user.service';

import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
	swal: any;
	userInfo: User;
	profile: Profile;
	showDetail: boolean;
	showUpload: boolean;

	data: any;
	cropperSettings: CropperSettings;
	cropper: ImageCropperComponent;

	constructor(private _gs: AppGlobalService, private _profileService: ProfileService) {

		this.userInfo = new User;
		this.userInfo.password = '';
		this.userInfo.password2 = '';

		this.showDetail = false;
		this.showUpload = false;

		this.data = new Image();

	}

	ngOnInit() {
		swal.isVisible();

		this._gs.pbarProgress(50);

		this._profileService.getUserProfile().subscribe(
			response => {
				this.userInfo = Object.assign({}, this._gs.authUser);
				this.profile = response;
				this.userInfo.profile = this.profile;

				this._gs.pbarProgress(90);
				this._gs.pbarFinish();
			},
			error => {
				console.log(error);
			}
		);

		this.setupCropper();
	}


	setupCropper() {
		this.cropperSettings = new CropperSettings();
		this.cropperSettings.width = 200;
		this.cropperSettings.height = 200;
		this.cropperSettings.croppedWidth = 200;
		this.cropperSettings.croppedHeight = 200;
		this.cropperSettings.canvasWidth = 200;
		this.cropperSettings.canvasHeight = 200;
		//this.cropperSettings.compressRatio = 1;
		this.cropperSettings.rounded = true;

		this.data = {};

	}


	fileChangeListener($event) {
		var image: any = new Image();
		var file: File = $event.target.files[0];
		var myReader: FileReader = new FileReader();
		var that = this;
		myReader.onloadend = function (loadEvent: any) {
			image.src = loadEvent.target.result;
			that.cropper.setImage(image);

		};

		myReader.readAsDataURL(file);
	}

	uploadFile() {
		//console.log(this.data.image);
		swal.isVisible();

		this._gs.pbarProgress(50);

		this._profileService.uploadAvatarImage(this.data.image).subscribe(
			response => {
				
				this._gs.authUser.avatar_img_url = response;
				this._gs.pbarProgress(90);
				this._gs.pbarFinish();
				swal(
                                'Uploaded!',
                                'Click to exit',
                                'success'
                )
			},
			error => {
				console.log(error);
			}
		);
	}

	toggleDetail() {
		if (this.showDetail) {
			this.showDetail = false;
		} else {
			this.showDetail = true;
		}
	}

	toggleUpload() {
		if (this.showUpload) {
			this.showUpload = false;
		} else {
			this.showUpload = true;
		}
	}


	updateProfile() {

		this._gs.pbarProgress(50);

		this._profileService.updateUserProfile(this.userInfo).subscribe(
			response => {
				this._gs.pbarProgress(90);

				this.userInfo.password = '';
				this.userInfo.password2 = '';
				this._gs.authUser = Object.assign({}, this.userInfo);

				this._gs.pbarFinish();

				swal(
					'Updated!',
					'The Profile has beed updated',
					'success'
				);
			},
			error => console.log(error)
		);
	}


}
