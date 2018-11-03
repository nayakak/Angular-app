import { Component, OnInit } from '@angular/core';
import * as myGlobals from  '../../_services/globals';
import { Router, ActivatedRoute } from '@angular/router';
import {Http ,RequestOptions, Headers} from '@angular/http';
import { AlertService, AuthenticationService } from '../../_services';
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
  constructor(private $http: Http, private authenticationService: AuthenticationService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.username = this.user_.userName;
    this.fullname = this.user_.firstName+' '+this.user_.lastName;
    this.created_date = this.user_.created_date;
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
