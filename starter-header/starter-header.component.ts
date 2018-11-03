import { Component, OnInit } from '@angular/core';
import * as myGlobals from  '../../_services/globals';
@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})


export class StarterHeaderComponent implements OnInit {
  
  public user_:any = JSON.parse(localStorage.getItem('currentUser'));
  public username:string = '';
  public fullname:string = '';;
  public created_date:string = '';;
  constructor() { }

  ngOnInit() {
    this.username = this.user_.userName;
    this.fullname = this.user_.firstName+' '+this.user_.lastName;
    this.created_date = this.user_.created_date;
  }

}
