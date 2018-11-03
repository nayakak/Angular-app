import { Component, OnInit } from '@angular/core';
import { } from 'jquery';
import {} from 'morris.js';
import { } from 'jquery-knob';
import { } from 'bootstrap-datepicker';
import { } from 'jqueryui';
import { } from 'daterangepicker';
import { } from 'jquery.slimscroll';
import * as moment from 'moment';
import { AlertService, AuthenticationService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';


// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-dashboard1',
  templateUrl: './admin-dashboard1.component.html',
  styleUrls: ['./admin-dashboard1.component.css']
})
export class AdminDashboard1Component implements OnInit {
  linechart: morris.GridChart;
  areaChart: morris.GridChart;
  donutChart: morris.DonutChart;
  knob: JQuery;
  calendar: JQuery;

  constructor( private authenticationService: AuthenticationService,private route: ActivatedRoute) { }
  ngOnInit() {
     // Update the AdminLTE layouts
    AdminLTE.init();

  }
  

}
