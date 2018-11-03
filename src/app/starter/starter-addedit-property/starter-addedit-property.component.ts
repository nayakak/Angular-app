import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../admin/adminservices/data.service';
import { ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../_services/user.service';
import * as md5 from "blueimp-md5/js/md5";
import * as myGlobals from  '../../_services/globals';

@Component({
  selector: 'app-starter-addedit-property',
  templateUrl: './starter-addedit-property.component.html',
  styleUrls: ['./starter-addedit-property.component.css']
})
export class StarterAddeditPropertyComponent implements OnInit {
  uniqueId:string = '';
  add_form:string = '';
  edit_form:string = '';
  respMsg:string = '';

  constructor(private fb: FormBuilder, 
    private agentservice: DataService,
    private router: Router,
    private route: ActivatedRoute , 
    private userService: UserService) { }

  ngOnInit() {
    if(this.route.snapshot.params.id == 'add'){
      this.uniqueId = this.agentservice.guid();
      this.add_form = 'add';
    }else{
      this.edit_form = 'edit'; 
    }
  }

}
