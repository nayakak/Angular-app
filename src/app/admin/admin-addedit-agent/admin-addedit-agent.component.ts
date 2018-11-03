import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { DataService } from '../adminservices/data.service';
import { Router } from '@angular/router';
import * as myGlobals from  '../../_services/globals';
import { UserService } from '../../_services/user.service';
import * as md5 from "blueimp-md5/js/md5";

@Component({
  selector: 'app-admin-addedit-agent',
  templateUrl: './admin-addedit-agent.component.html',
  styleUrls: ['./admin-addedit-agent.component.css']
})
export class AdminAddeditAgentComponent implements OnInit {
  public Id : string;
  public agent : any = [];
  public add_form : string = '';
  public edit_form:string = '';
  public uniqueRandom:string='';
  public vUsername:boolean = false;
  public vPersonId:boolean = false;
  public vFirst:boolean = false;
  public vLast:boolean = false;
  public vEmail:boolean = false;
  public vPass:boolean = false;
  public serviceagent:any;
  public usergrp:any;
  public userValidation:any =Array;
  public uiMsg:string='';
  public loading:boolean=false;
  constructor(
  private route: ActivatedRoute , 
  private dataService: DataService,
  private router: Router,
  private userService: UserService) { 
    
   }

   async ngOnInit() {
    
    if(this.route.snapshot.params.id == 'add'){
        this.add_form = 'add';
        this.uniqueRandom = this.guid();
    }else{
      const id: string = this.route.snapshot.params.id;
      this.Id = id;
      this.edit_form = 'edit';
      this.agent = await this.dataService.getHypUserById(this.Id);
    }    
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  navigateToLogin(){
    this.router.navigate(['admin/agents']);
  }

  async sbmt(){
    this.loading = true;
    var uniqueId = $('#personId').val();
    var username = $('#userName').val();
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var email = $('#Email').val();
    var pass = $('#Password').val();
    
    if(uniqueId == ''){this.vPersonId = true;}else{this.vPersonId = false;}
    if(username == ''){this.vUsername = true;}else{this.vUsername = false;}
    if(fname == ''){this.vFirst = true;}else{this.vFirst = false;}
    if(lname == ''){this.vLast = true;}else{ this.vLast = false;}
    if(email == ''){this.vEmail = true;}else{this.vEmail = false;}
    if(pass == ''){this.vPass = true;}else{ this.vPass = false;}
    if(!this.vUsername && !this.vFirst && !this.vLast &&  !this.vEmail &&  !this.vPass){
      pass = md5(pass);    
      let obj:any = {
        username: username,
        first_name:fname,
        last_name:lname,
        email:email,
        password:pass
      }
    this.userValidation = await this.dataService.getUserIsExist(username , email);
    if(this.userValidation.length == 0){
      this.serviceagent = await this.dataService.addUser(obj ,uniqueId , 2);
      this.usergrp =  await this.dataService.addUserGroup(uniqueId , myGlobals.AGENT_GRP_ID);
      
      if(this.serviceagent && this.usergrp){
        this.userService.addAgent(obj);
        this.uiMsg = 'Record added Successfuly.';
        setTimeout(this.navigateToLogin.bind(this),3000);
      }
    }else if(this.userValidation.length > 0 ){
      this.uiMsg = 'User Already Exist with this Email or Username';
      this.loading = false;
    }
  }
  
  }

  async onUpdate(){
    debugger
    this.loading = true;
    var uniqueId = $('#personId').val();
    var username = $('#userName').val();
    var fname = $('#firstName').val();
    var lname = $('#lastName').val();
    var email = $('#Email').val();
    var pass = $('#Password').val();
    
    var user_type = this.agent.user_type;
    var created_date = this.agent.created_date;
  
    if(uniqueId == ''){this.vPersonId = true;}else{this.vPersonId = false;}
    if(username == ''){this.vUsername = true;}else{this.vUsername = false;}
    if(fname == ''){this.vFirst = true;}else{this.vFirst = false;}
    if(lname == ''){this.vLast = true;}else{ this.vLast = false;}
    if(email == ''){this.vEmail = true;}else{this.vEmail = false;}
    if(pass == ''){this.vPass = true;}else{ this.vPass = false;}
    if(!this.vUsername && !this.vFirst && !this.vLast &&  !this.vEmail &&  !this.vPass){
      if(this.agent.Password != pass){
        pass = md5(pass); 
      }
      let obj:any = {
        personId : uniqueId,
        userName: username,
        firstName:fname,
        lastName:lname,
        Email:email,
        Password:pass,
        user_type:user_type,
        created_date:created_date
      }
    this.userValidation = await this.dataService.getUserValid(username , email);
    if(this.userValidation[0].personId == this.agent.personId){
      this.serviceagent = await this.dataService.updateUser(obj ,true);

      if(this.serviceagent){
        this.uiMsg = 'Record Updated Successfuly.';
        setTimeout(this.navigateToLogin.bind(this),3000);
      }
    }else{
      this.uiMsg = 'User Already Exist with this Email or Username';
      this.loading = false;
    }
  }
  
  }

}
