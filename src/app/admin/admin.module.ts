import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin.routing';
import { AuthGuard } from '../auth.guard';
import { AdminService } from './shared/admin.service';
import { MessageService } from './shared/message.service';
import { ProfileService } from './shared/profile.service';
import { UserService } from '../shared/user.service';

import { AdminComponent } from './admin.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingbarComponent } from './settingbar/settingbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    declarations: [ 
        AdminComponent,
        TopbarComponent,
        FooterComponent,
        SidebarComponent,
        SettingbarComponent,
        DashboardComponent
    ],
    imports: [ AdminRoutingModule ],
    providers: [ AuthGuard, AdminService, MessageService, ProfileService, UserService ]
})

export class AdminModule {}