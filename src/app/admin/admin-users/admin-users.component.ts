import { Component, OnInit } from '@angular/core';
import { DataService } from '../adminservices/data.service';
import { Router } from '@angular/router';
import 'datatables';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit { 

  public registerUsers : any = [] ; 
  public HyperUsers : any = [] ;   
  public uniqueRandomNumber:string = '';
  public resp:boolean = false;
  public updatelocaluser:any='';
  public anc:boolean  = true;
  public updateResp:any = '';
  public block:boolean = false;
  public unblock:boolean = false;
  constructor(private dataService: DataService , private router: Router) {
    
    this.dataService.get_all_users().subscribe((res : any)=>{
    this.registerUsers = res.json().users;
    });
  }

  async ngOnInit() {
    this.HyperUsers = await this.dataService.getHypBuyers();
    $(document).ready(function(){
      $('.user-table').DataTable();
    });
  }

  async sendHyperLedger(obj){
    this.anc = false;
    this.uniqueRandomNumber = this.guid();
    await this.dataService.addUser(obj , this.uniqueRandomNumber);
    await this.dataService.addUserGroup(this.uniqueRandomNumber);
    this.updatelocaluser = await this.dataService.updateMysqlUser(obj.id);
    if(this.updatelocaluser.message == 'Success'){
      this.resp = true; 
      setTimeout(() => {
        this.navigateToLogin();
      }, 1000);
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
    this.router.navigate(['admin/users']);
  }

  async blockUser(obj){
   this.updateResp = await this.dataService.updateUser(obj , false);
   console.log(this.updateResp);
   if(this.updateResp){
     this.block = true;
     setTimeout(function(){
      window.location.reload();
     },2000);
   }
  }

  async unblockUser(obj){
    this.updateResp = await this.dataService.updateUser(obj , true);
    console.log(this.updateResp);
    if(this.updateResp){
      this.unblock=true;
      setTimeout(function(){
       window.location.reload();
      },2000);
    }
  }

}
