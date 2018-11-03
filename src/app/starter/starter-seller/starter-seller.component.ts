import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../admin/adminservices/data.service';
import { ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-starter-seller',
  templateUrl: './starter-seller.component.html',
  styleUrls: ['./starter-seller.component.css']
})
export class StarterSellerComponent implements OnInit {
  seller:any=[];
  block:boolean=false;
  constructor(private dt : DataService) {
      
  }

  async ngOnInit() {
    this.seller = await this.dt.getUserByType(3);
  }
}
