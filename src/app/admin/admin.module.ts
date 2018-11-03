import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminDashboard1Component } from './admin-dashboard1/admin-dashboard1.component';
import { AdminControlSidebarComponent } from './admin-control-sidebar/admin-control-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminGroupComponent } from './admin-group/admin-group.component';
import { AdminGroupEditComponent } from './admin-group-edit/admin-group-edit.component';
import { AdminAgentComponent } from './admin-agent/admin-agent.component';
import { AdminAddeditAgentComponent } from './admin-addedit-agent/admin-addedit-agent.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminLeftSideComponent,
    AdminContentComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent,
    AdminDashboard1Component,
    AdminDashboard2Component,
    AdminUsersComponent,
    AdminGroupComponent,
    AdminGroupEditComponent,
    AdminAgentComponent,
    AdminAddeditAgentComponent,
    AdminProfileComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
