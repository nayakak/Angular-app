import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { fakeBackendProvider } from './_helpers';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AdminAuthGuard } from './_guards/adminauth.guard';
import { JwtInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';
import { AdminDashboard2Component } from './admin/admin-dashboard2/admin-dashboard2.component';
import { AdminRoutingModule } from './admin/admin-routing/admin-routing.module';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './admin/adminservices/data.service';
import { AdminGroupComponent} from './admin/admin-group/admin-group.component';
import { AdminGroupEditComponent } from './admin/admin-group-edit/admin-group-edit.component';
import { AdminAgentComponent } from './admin/admin-agent/admin-agent.component';
import { AdminAddeditAgentComponent } from './admin/admin-addedit-agent/admin-addedit-agent.component';
import { StarterComponent } from './starter/starter.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { AgentAuthGuard } from './_guards/agentauth.guard';
import { StarterProfileComponent } from './starter/starter-profile/starter-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import {AdminProfileComponent} from './admin/admin-profile/admin-profile.component';
import { StarterPropertyComponent } from './starter/starter-property/starter-property.component';
import { StarterSellerComponent } from './starter/starter-seller/starter-seller.component';
import { StarterAddeditSellerComponent } from './starter/starter-addedit-seller/starter-addedit-seller.component';
import { StarterAddeditPropertyComponent } from './starter/starter-addedit-property/starter-addedit-property.component';
import { StarterListpropSellerComponent } from './starter/starter-listprop-seller/starter-listprop-seller.component';
import { AdminModule } from '../app/admin/admin.module';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        HttpModule,
        AdminModule,
        AdminRoutingModule,
        DataTablesModule,
        ReactiveFormsModule
    ],
    declarations: [  
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        StarterComponent,
        StarterContentComponent,
        StarterControlSidebarComponent,
        StarterFooterComponent,
        StarterHeaderComponent,
        StarterLeftSideComponent,
        StarterProfileComponent,
        StarterPropertyComponent,
        StarterSellerComponent,
        StarterAddeditSellerComponent,
        StarterAddeditPropertyComponent,
        StarterListpropSellerComponent 
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        AdminAuthGuard,
        AgentAuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // provider used to create fake backend
        fakeBackendProvider,
        DataService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }