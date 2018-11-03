import { Component, OnInit, OnDestroy } from '@angular/core';
import * as myGlobals from  '../_services/globals';
import { DataService } from './adminservices/data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width:'100%',
            transform: 'translateX(-100%)'
          }),
          {optional:true}),

        // move page off screen right on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width:'100%',
              transform: 'translateX(100%)'
            })
          ),
        {optional:true}),

        // move page in screen from left to right
        query(':enter',
          animate('500ms ease',
            style({
              opacity: 1,
              transform: 'translateX(0%)'
            })
          ),
        {optional:true}),
      ])
    ])
  ]
})
export class AdminComponent implements OnInit, OnDestroy {
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  public groups:any;
  constructor(private dataService: DataService) { }

  async ngOnInit() {
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    
    this.groups = await this.dataService.getGroup();
    if(this.groups.length == 0){
      var a1:any = {
        groupId : myGlobals.BUYER_GRP_ID,
        groupName : 'Buyer',    
        slug : 'buyer'
        // created_date : new Date().toString()
      };
      await this.dataService.addGroup(a1);
      var a2 = {
        groupId : myGlobals.AGENT_GRP_ID,
        groupName : 'Agent',
        slug : 'agent'
        // created_date : new Date().toString()
      };
      await this.dataService.addGroup(a2);
      var a3 = {
        groupId : myGlobals.SELLER_GRP_ID,
        groupName : 'Seller',
        slug : 'seller'
        // created_date : new Date().toString()
      }
      await this.dataService.addGroup(a3);
    }
    // add the the body classes
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

}
