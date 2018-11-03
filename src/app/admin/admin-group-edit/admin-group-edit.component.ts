import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { DataService } from '../adminservices/data.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css']
})
export class AdminGroupEditComponent implements OnInit {
  public Id : string;
  public groups : any = [];
  public add_form : string = '';
  public edit_form:string = '';
  public uniqueRandom:string='';
  constructor(private route: ActivatedRoute , private dataService: DataService,private router: Router) { }

  async ngOnInit() {
    
    if(this.route.snapshot.params.id == 'add'){
        this.add_form = 'add';
        this.uniqueRandom = this.guid();
    }else{
      const id: string = this.route.snapshot.params.id;
      this.Id = id;
      this.edit_form = 'edit';
      this.groups = await this.dataService.getByGroupByID(this.Id);
    }    
  }

onUpdate(){
  var form_array : any =  $('.edit_form form').serializeArray();
  var len = form_array.length;
  let obj = '{';
  var i=0;
    form_array.forEach(element => {
      var columnname  = element.name;
      var columnvalue = element.value;
      if(i == len-1){
        obj += '"'+columnname+'"' + ":" + '"'+columnvalue + '"';
      }else{
        obj += '"'+columnname+'"' + ":" + '"'+columnvalue + '"' + ",";
      }
      i++;
    });
    obj += '}';
    obj = JSON.parse(obj);
    this.dataService.updateGroup(obj);
    alert('Record Updated Successfuly.');
    this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(["admin/group/"]));
  }

  onSubmit(){
      var form_array : any =  $('.add form').serializeArray();
      var len = form_array.length;
      let obj = '{';
      var i=0;
        form_array.forEach(element => {
          var columnname  = element.name;
          var columnvalue = element.value;
          if(i == len-1){
            obj += '"'+columnname+'"' + ":" + '"'+columnvalue + '"';
          }else{
            obj += '"'+columnname+'"' + ":" + '"'+columnvalue + '"' + ",";
          }
          i++;
        });
        obj += '}';
        obj = JSON.parse(obj);
        debugger
        this.dataService.addGroup(obj);
        alert('Record added Successfuly.');
        this.router.navigateByUrl('/DummyComponent', {skipLocationChange: true}).then(()=>
        this.router.navigate(["admin/group/"]));
    }

    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

}
