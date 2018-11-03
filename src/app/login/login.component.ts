import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    public message:any =Array;
    public eMsg:boolean=false;
    public userMessages:string='';
    public login_type:any = 'user';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
    ngOnInit() {
        if(this.route.snapshot.params.type == 'agent'){
           this.login_type = 'agent';
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    async login() {
        debugger;
        this.loading = true;
        this.message = await this.authenticationService.login(this.model.username , this.model.password);
        if(this.message.message == 'ok'){
            this.router.navigate([this.returnUrl]);
        }else if(this.message.msg == 'not exist'){
            this.eMsg = true;
            this.loading = false;
            this.userMessages = 'User doesn\'t activated';
        }else if(this.message.code == '204'){
            this.eMsg = true;
            this.loading = false;
            this.userMessages = this.message.success;
        }else{
            this.eMsg = true;
            this.loading = false;
            this.userMessages = 'User Doesn\'t Exist.';
        }
    }

    async agentlogin(){
        this.loading = true;
        this.message = await this.authenticationService.agentlogin(this.model.username , this.model.password);
        if(this.message.resp){
            this.router.navigate([this.returnUrl]); 
        }else{
            this.eMsg = true;
            this.loading = false;
            this.userMessages = this.message.message;
        }
    }
}
