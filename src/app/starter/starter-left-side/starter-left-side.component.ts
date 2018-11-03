import { Component, OnInit } from '@angular/core';
import * as myGlobals from  '../../_services/globals';
@Component({
  selector: 'app-starter-left-side',
  templateUrl: './starter-left-side.component.html',
  styleUrls: ['./starter-left-side.component.css']
})
export class StarterLeftSideComponent implements OnInit {
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
