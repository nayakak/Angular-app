import { Component, OnInit } from '@angular/core';
import { DataService } from '../admin/adminservices/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services';
import { User } from '../_models';
import { UserService } from '../_services';
import 'datatables';
import * as $ from 'jquery';
import { WSASYSNOTREADY } from 'constants';
import { DYNAMIC_TYPE } from '@angular/compiler/src/output/output_ast';
var bidValue:any;
var persnID:any;
var CurrentDate:any;


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser:any = [];
    users: User[] = [];
    public lands : any = [];
    public ofr_details: any=[];
    constructor(private dataService: DataService,private userService: UserService, private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     
    }

    ngOnInit() {
        this.loadAllUsers();
        this.landData();
    }

    async landData(){
        this.lands = await this.dataService.getLand();
         $(document).ready(function(){
             $('#land-table').DataTable();
         });
    }

    search(nameKey, myArray , spnid){
        
        persnID = localStorage.getItem('personID');
        persnID = persnID.slice(1, -1);
        for (var i=0; i < myArray.length; i++) {
           //console.log(myArray[i].listing);
            if (myArray[i].listing === 'resource:org.kindlebit.com.LandTitle#'+nameKey && myArray[i].person === 'resource:org.kindlebit.com.Users#'+persnID ) {
                $('#spn_'+spnid).html(myArray[i].bidPrice);
                $('#bidVal_'+spnid).hide();
                $('#btn-bid_'+spnid).hide();
                //return true;
               
            }
        }
        return false;
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    logout(){
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    async BidProperty(propId){
        bidValue = $("#bidVal_"+propId).val();
        if(bidValue)
        {
        persnID = localStorage.getItem('personID');
        persnID = persnID.slice(1, -1);

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        CurrentDate = date+' '+time;
        let createService:any = await this.userService.addOffer(bidValue,persnID,propId,CurrentDate);
        alert("Successfully submitted.");
        }else{

          $('#emptybid_'+propId).html('Please enter your bid');

        }

       
     }
     
}