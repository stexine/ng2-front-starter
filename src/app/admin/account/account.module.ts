import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import { AccountRoutingModule } from './account.routing';

import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ],
  declarations: [ProfileComponent, ImageCropperComponent ],
  providers: []
})
export class AccountModule { }
