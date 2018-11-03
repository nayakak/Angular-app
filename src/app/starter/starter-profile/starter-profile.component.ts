import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { DataService } from '../../admin/adminservices/data.service';
import * as md5 from "blueimp-md5/js/md5";
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-profile',
  templateUrl: './starter-profile.component.html',
  styleUrls: ['./starter-profile.component.css']

})
export class StarterProfileComponent implements OnInit {
  rForm: FormGroup;
  post:any; 
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
  active:boolean;
  profile_pic:string='';
  created_date:string='';
  user_type:any;
  public users:any = [];
  titleAlert:string = 'This field is required';
  matchPassword : string = '' ;
  formValidate:boolean = true;
  
  constructor(private fb: FormBuilder,private agentservice: DataService,private router: Router) { 
    this.rForm = fb.group({
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
  }

  async ngOnInit() {
    var userId:any = JSON.parse(localStorage.getItem('currentUser')).personId;
    this.users = await this.agentservice.getHypUserById(userId);
    console.log(this.users);
    this.personId = userId;
    this.firstname = this.users.firstName;
    this.lastname = this.users.lastName;
    this.email = this.users.Email;
    this.profile_pic = this.users.profile_pic;
    this.username = this.users.userName;
    this.city = this.users.city;
    this.state = this.users.state;
    this.address = this.users.Address;
    this.opassword = this.users.Password;
    this.user_type = this.users.user_type;
    this.active = this.users.active;
    this.created_date = this.users.created_date;
  }

  async onClickSubmit(data){
    this.validate(data);
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

}
