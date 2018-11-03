import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AdminAuthGuard} from './_guards/adminauth.guard';
import { AdminDashboard2Component } from './admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';
import { AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import { AdminGroupComponent} from './admin/admin-group/admin-group.component';
import { AdminGroupEditComponent } from './admin/admin-group-edit/admin-group-edit.component';
import { AdminAgentComponent } from './admin/admin-agent/admin-agent.component';
import { AdminAddeditAgentComponent } from './admin/admin-addedit-agent/admin-addedit-agent.component';
import { StarterComponent } from './starter/starter.component';
import { AgentAuthGuard } from './_guards/agentauth.guard';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterProfileComponent } from './starter/starter-profile/starter-profile.component';
import { StarterPropertyComponent } from './starter/starter-property/starter-property.component'; 
import { StarterSellerComponent } from './starter/starter-seller/starter-seller.component';
import { StarterAddeditSellerComponent } from './starter/starter-addedit-seller/starter-addedit-seller.component';
import { StarterAddeditPropertyComponent } from './starter/starter-addedit-property/starter-addedit-property.component';
import { StarterListpropSellerComponent} from './starter/starter-listprop-seller/starter-listprop-seller.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'admin',
        component: AdminComponent,canActivate: [AdminAuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
      
          },
          {
            path: 'dashboard',
            component: AdminDashboard1Component,
  
          },
          {
            path: 'dashboard2',
            component: AdminDashboard2Component,
 
          },
          {
            path: 'users',
            component: AdminUsersComponent,
 
          },
          {
            path: 'agents',
            component: AdminAgentComponent,
 
          },
          {
            path: 'group',
            component: AdminGroupComponent,
     
          },
          {
            path: 'group/:id',
            component: AdminGroupEditComponent,
    
          },
          {
            path: 'agent/:id',
            component: AdminAddeditAgentComponent,
          },
          {
            path: 'profile',
            component: AdminProfileComponent,
      
          }
          
        ]
      },
    { path: 'agent', component: StarterComponent , canActivate: [AgentAuthGuard] ,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component:StarterContentComponent ,
  
      },
      {
        path: 'profile',
        component: StarterProfileComponent,
  
      },
      {
        path: 'property',
        component: StarterPropertyComponent,
  
      },
      {

        path: 'property/:id',
        component: StarterAddeditPropertyComponent,
      
      },
      {
        path: 'seller',
        component: StarterSellerComponent,
  
      },
      {
        path: 'seller/:id',
        component: StarterAddeditSellerComponent,
  
      },
      {
        path: 'seller/list/property/:id',
        component: StarterListpropSellerComponent,
  
      }
    ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'login/:type', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);