import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starter-property',
  templateUrl: './starter-property.component.html',
  styleUrls: ['./starter-property.component.css']
})
export class StarterPropertyComponent implements OnInit {
  block:boolean=false;
  agents:any=[];
  constructor() { }

  ngOnInit() {
  }

}
