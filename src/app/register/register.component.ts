import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; 
import { AlertService, UserService } from '../_services';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    public groupId:string;
    
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    async register() {

        this.loading = true;
        let createService:any = await this.userService.addUser(this.model);
        if(createService.code == 200){
            $('#resp_div').addClass('alert alert-success');
            $('#resp_div').html('Registration successful');
            setTimeout(this.navigateToLogin.bind(this),3000);
        }else if(createService.resp == 'duplicate'){
            $('#resp_div').addClass('alert alert-warning');
            $('#resp_div').html(createService.msg);
            this.loading = false;
        }else{
            $('#resp_div').addClass('alert alert-danger');
            $('#resp_div').html(createService.failed);
            this.loading = false;
        }
    }


    navigateToLogin(){
        this.router.navigate(['/login']);
    }
}
