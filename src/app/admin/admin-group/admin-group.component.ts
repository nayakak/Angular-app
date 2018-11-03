import { Component, OnInit } from '@angular/core';
import { DataService } from '../adminservices/data.service';
import 'datatables';
import * as $ from 'jquery';
import { Router } from '@angular/router'; 
import * as myGlobals from  '../../_services/globals';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {
  public groups : any = [];
  public showDataTable:boolean = false;
  public price : number;
  public currency : string = 'USD';

  constructor(private dataService: DataService ,private router: Router) { 

  }

  async ngOnInit() {
    this.loadGroup();
  }
  async loadGroup(){
    debugger;
    this.groups = await this.dataService.getGroup();
    
    $(document).ready(function(){
      $('.group-table').DataTable();
    });
  }

  updateGroup(obj){
    this.router.navigate(['admin/group', obj.groupId]);
  }

  delete(obj){
    this.dataService.deleteGroupByID(obj);
    alert('Record Deleted Successfuly.');
    window.location.reload();

  }
  addGroup(){
     //this.router.navigate(['admin/group' , 'add']);
  }

}
