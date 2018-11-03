import { AdminDashboard2Component } from '../admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from '../admin-dashboard1/admin-dashboard1.component';
import { AdminComponent } from '../admin.component';
import { NgModule, Component } from '@angular/core';
import { AdminAuthGuard } from '../../_guards/adminauth.guard';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminUsersComponent} from '../admin-users/admin-users.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
