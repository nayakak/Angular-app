import { Component, OnInit } from '@angular/core';
import { DataService } from '../adminservices/data.service';
import { Router} from '@angular/router'; 
@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['./admin-agent.component.css']
})
export class AdminAgentComponent implements OnInit {
  public agents : any = [];
  public registerUsers : any = [] ; 
  public HyperUsers : any = [] ;   
  public uniqueRandomNumber:string = '';
  public resp:boolean = false;
  public updatelocaluser:any='';
  public anc:boolean  = true;
  public updateResp:any = '';
  public block:boolean = false;
  public unblock:boolean = false;
  constructor(private dataService : DataService , private router : Router) {

  }

  async ngOnInit() {
    this.agents = await this.dataService.getHypAgents();
    $(document).ready(function(){
      $('.agent-table').DataTable();
    });
  }
  addAgent(){
    this.router.navigate(['admin/agent' , 'add']);
  }

  async blockUser(obj){
    this.block = true;
    this.updateResp = await this.dataService.updateUser(obj , false);
    if(this.updateResp){
      setTimeout(function(){
       window.location.reload();
      },2000);
    }
   }

   async unblockUser(obj){
    this.updateResp = await this.dataService.updateUser(obj , true);
    this.block = true;
    if(this.updateResp){
      setTimeout(function(){
       window.location.reload();
      },2000);
    }
  }

  async edit(obj){
    this.router.navigate(['admin/agent' ,  obj.personId]);
  }


}
