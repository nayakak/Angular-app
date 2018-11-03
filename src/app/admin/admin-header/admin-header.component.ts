import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import {Http ,RequestOptions, Headers} from '@angular/http';
import * as myGlobals from  '../../_services/globals';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  returnUrl: string;
  public fullname:string;
  baseUrl:string = myGlobals.API_END_POINT;
  public created_date:string;
  constructor(private $http: Http, private authenticationService: AuthenticationService,private route: ActivatedRoute,private router: Router) { }

  async ngOnInit() {
    var auth = JSON.parse(localStorage.getItem('currentUser'));
    var id = auth.id;
    const response = await this.$http.get(this.baseUrl + 'byid/'+id).toPromise();
    this.fullname = auth.first_name+' '+ auth.last_name;
    this.created_date = response.json().users[0].created_date;
  }

  logout(){
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
