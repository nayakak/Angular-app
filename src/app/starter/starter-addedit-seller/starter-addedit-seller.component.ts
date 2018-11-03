import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../admin/adminservices/data.service';
import { ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../_services/user.service';
import * as md5 from "blueimp-md5/js/md5";
import * as myGlobals from  '../../_services/globals';

@Component({
  selector: 'app-starter-addedit-seller',
  templateUrl: './starter-addedit-seller.component.html',
  styleUrls: ['./starter-addedit-seller.component.css']
})
export class StarterAddeditSellerComponent implements OnInit {
  rForm: FormGroup;
  post:any; 
  uiMsg:string='';
  block:boolean=false;
  description:string = '';
  personId:string='';
  firstname:string = '';
  lastname:string = '';
  email:string = '';
  username:string ='';
  city:string = '';
  state:string='';
  address:string='';
  password:string='';
  opassword:string='';
  cpassword:string='';
  active:boolean = true;
  profile_pic:string='';
  created_date:string='';
  user_type:any = 3;
  public users:any = [];
  titleAlert:string = 'This field is required';
  emailAlert:string='Enter valid email.';
  matchPassword : string = '' ;
  formValidate:boolean = true;
  add_form:string='';
  edit_form:string='';
  agent:any=[];
  uservalidate:any=[];
  email_msg:string ='';
  user_msg:string='';

  constructor(private fb: FormBuilder,
    private agentservice: DataService,
    private router: Router,
    private route: ActivatedRoute , 
    private userService: UserService) { 
    }

 async ngOnInit() {
    if(this.route.snapshot.params.id == 'add'){
      this.add_form = 'add';
      this.edit_form = '';
      this.personId = this.agentservice.guid();
      this.rForm = this.fb.group({
      'personId' : [null, Validators.required],
      'user_type' : [null, Validators.required],
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'email' :  [null, Validators.required],
      'username' :  [null, Validators.required],
      'city' :  [null, Validators.required],
      'state' :  [null, Validators.required],
      'address' :  [null, Validators.required],
      'password' :  [null, Validators.required],
      'cpassword' :  [null, Validators.required],
      'profile_pic' : '',
      'active' : '',
      'created_date' : ''
    });
    }else{
      this.rForm = this.fb.group({
        'personId' : [null, Validators.required],
        'user_type' : [null, Validators.required],
        'firstname' : [null, Validators.required],
        'lastname' : [null, Validators.required],
        'email' :  [null, Validators.required],
        'username' :  [null, Validators.required],
        'city' :  [null, Validators.required],
        'state' :  [null, Validators.required],
        'address' :  [null, Validators.required],
        'password' :  '',
        'cpassword' :  '',
        'opassword' : '',
        'profile_pic' : '',
        'active' : '',
        'created_date' : ''
      });
      const id: string = this.route.snapshot.params.id;
      this.personId = id;
      this.edit_form = 'edit';
      this.add_form = '';
      this.agent = await this.agentservice.getHypUserById(this.personId);
      this.personId = id;
      this.firstname = this.agent.firstName;
      this.lastname = this.agent.lastName;
      this.email = this.agent.Email;
      this.profile_pic = this.agent.profile_pic;
      this.username = this.agent.userName;
      this.city = this.agent.city;
      this.state = this.agent.state;
      this.address = this.agent.Address;
      this.opassword = this.agent.Password;
      this.user_type = this.agent.user_type;
      this.active = this.agent.active;
      this.created_date = this.agent.created_date;
    }
  }

  

  async onClickSubmit(data){
   
    this.validate(data);
    this.isUsernameValid(data);
   if(this.formValidate){
       let pass = md5(data.password);    
       let obj:any = {
        "$class": "org.kindlebit.com.Users",
        "personId": data.personId,
        "userName": data.username,
        "firstName": data.firstname,
        "lastName": data.lastname,
        "Email": data.email,
        "Password": pass,
        'user_type':data.user_type,
        "profile_pic": data.profile_pic,
        "city": data.city,
        "state": data.state,
        "Address": data.address,
        "active": data.active,
        "created_date" : new Date().toString()  
       }
       const resp:any = await this.agentservice.addSeller(obj);
       const grpResp:any = await this.agentservice.addUserGroup(data.personId ,myGlobals.SELLER_GRP_ID);
       if(resp && grpResp){
        this.matchPassword = 'Record added successfuly.';
       }else{
        this.matchPassword = 'Something went wrong.';
       } 
    }
    setTimeout(function(){
      window.location.reload();
    },2500);
  }
  async onClickSubmitEdit(data){
    this.validate(data);
    this.isUsernameValid(data);
    if(this.formValidate && data.password == '' && data.cpassword == ''){
      const resp:any = await this.agentservice.updateAgent(data);
      if(resp.status == 200){
          this.matchPassword = 'Record successfuly updated.';
      }else{
          this.matchPassword = 'Something went wrong.';
      } 
    }else if(this.formValidate && data.password !== '' && data.cpassword !== ''){
       let pass = md5(data.password);    
       let obj:any = {
        "$class": "org.kindlebit.com.Users",
        "personId": data.personId,
        "userName": data.username,
        "firstName": data.firstname,
        "lastName": data.lastname,
        "Email": data.email,
        "Password": pass,
        'user_type':data.user_type,
        "profile_pic": data.profile_pic,
        "city": data.city,
        "state": data.state,
        "Address": data.address,
        "active": data.active,
        "created_date" : data.created_date  
       }
       const resp:any = await this.agentservice.updateAgent(data);
       if(resp.status == 200){
        this.matchPassword = 'Record successfuly updated.';
      }else{
        this.matchPassword = 'Something went wrong.';
      } 
    }
    setTimeout(function(){
      window.location.reload();
    },2000);
  }

  validate(data){
    if(data.cpassword == '' && data.password != ''){
      this.formValidate = false;
      this.matchPassword = 'Confirm password field can\'t blank.';
    }
    if(data.cpassword != '' && data.password == ''){
      this.formValidate = false;
      this.matchPassword = 'password field can\'t blank.';
    }
    if(data.cpassword != data.password && data.password != '' && data.cpassword != ''){
      this.formValidate = false;
      this.matchPassword = 'Password doesn\'t match with confirm password.';
    }
  }

  async isUsernameValid(data){
    this.uservalidate = await this.agentservice.getUserIsExist( data.username , data.email);
    this.uservalidate.forEach(element => {
      if(element.userName == data.username){
        this.user_msg = 'Username already exist! try with different one';
        this.formValidate = false;
      }
      if(element.Email == data.email){
        this.email_msg = 'Email already exist! try with different one';
        this.formValidate = false;
      }

      if(element.userName == data.username && element.personId != data.personId){
        this.user_msg = 'Username already exist! try with different one';
        this.formValidate = false;
      }
      if(element.Email == data.email  && element.personId != data.personId){
        this.email_msg = 'Email already exist! try with different one';
        this.formValidate = false;
      }

    });
  }


}
