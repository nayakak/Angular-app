import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../admin/adminservices/data.service';
import { ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../_services/user.service';
import * as md5 from "blueimp-md5/js/md5";
import * as myGlobals from  '../../_services/globals';

@Component({
  selector: 'app-starter-listprop-seller',
  templateUrl: './starter-listprop-seller.component.html',
  styleUrls: ['./starter-listprop-seller.component.css']
})
export class StarterListpropSellerComponent implements OnInit {

  myForm: FormGroup;
  uniqueId:string = '';
  add_form:string = '';
  edit_form:string = '';
  respMsg:string = '';
  properties:any = [];
  block:boolean=false;
  userId:string = '';
  user_arr:any = [];
  property_saddress:any[];
  fullname:string = '';
  titleAlert:string = 'This field is required';
  titleId:string='';
  public response_msg  = '';
  public property_type:string='';
  public reservePrice:string='';
  public country:string='';
  public area:string='';
  public postcode:string
  public eircode:string;
  public streetaddress:string;
  public saletype:string = 'private-treaty';
  public information:string;
  public state:string;
  public proptype:string = 'Select property type';
  public forSale:string;
  public created_date:string = new Date().toString();
  public auctionDate:string;
  public auctionTime:string;
  public tender_date:string;
  public bedrooms:string;
  public bathroom:string;
  public overallFloorwidth:string;
  public overallFloorlength:string;
  public tax:string='tax_free';
  public facilities:any=['Parking' , 'Gas Fired Central Heating' , 'Alarm' , 'Wired for Cable Television' ,'Wheelchair Access','Oil Fired Central Heating'];
 // public submitfalse = true;
  public formfalse = true;
  constructor(private fb: FormBuilder, 
    private agentservice: DataService,
    private router: Router,
    private route: ActivatedRoute , 
    private userService: UserService) { 
      this.myForm = this.fb.group({
        'uniqueId' : [null, Validators.required],
        'userId' : [null, Validators.required],
        'reservePrice' : [null, Validators.required],
        'country' : [null, Validators.required],
        'area' : [null, Validators.required],
        'postcode' : [null, Validators.required],
        'eircode' : [null, Validators.required],
        'streetaddress' : [null, Validators.required],
        'saletype' : [null, Validators.required],
        'information' : [null, Validators.required],
        'state' : [null, Validators.required],
        'proptype' : [null, Validators.required],
        'forSale' : [null, Validators.required],
        'created_date' : [null, Validators.required],
        'auctionDate' : [null, Validators.required],
        'auctionTime' : [null, Validators.required],
        'tender_date' : [null, Validators.required],
        'bedrooms' : [null, Validators.required],
        'bathroom' : [null, Validators.required],
        'overallFloorwidth' : '',
        'overallFloorlength' : '',
        'tax' : [null, Validators.required],
        'facilities' : this.fb.array(this.facilities|| []) ,
      });
  }

  async ngOnInit() {
    
    this.block = true;
    if(this.route.snapshot.params.id){
      this.uniqueId = this.agentservice.guid();
      this.userId = this.route.snapshot.params.id;
      this.user_arr  = await this.agentservice.getHypUserById(this.userId);

     // console.log(this.user_arr);

      this.properties = await this.agentservice.getPropertyByUserId(this.route.snapshot.params.id);
      this.block = false;
      this.fullname = this.user_arr.firstName +' '+ this.user_arr.lastName;

      if(this.properties.length == 0){
        this.respMsg = 'No Record Found!!';
      }
      this.titleId = this.uniqueId;
    }else{
      this.respMsg = 'Something Went Wrong.';
    }
  }

  changeType(id){
      if(id == 'auction'){
        $('.auction-section').css('display','block');
        $('.tender-section').css('display','none');
      }else{
        $('.auction-section').css('display','none');
        $('.tender-section').css('display','block');
      }
  }
  showAddForm(){
    $('#table-list').fadeOut('fast');
    $('#add-container').fadeIn('slow');
    this.respMsg = '';
  }

  async deleteproperty(person)
  {
   //debugger;
  let landid =person.titleId;
  const response = await this.userService.deletePropByID(landid);
  this.properties = await this.agentservice.getPropertyByUserId(this.route.snapshot.params.id);
   
 // console.log(response);
  }

 async checkaddress(adr)
  {
    //debugger;
   this.property_saddress = await this.agentservice.getAllProperty(); 
   for(var i=0;i<this.property_saddress.length;i++)
   {
    // console.log(this.property_saddress);
   let staddr= this.property_saddress[i].streetaddress;
      if(adr === staddr)
     {
        $('#exist-addr').html('Address already exists');
        $('#exist-addr').show();
        return false;
     }else{
      $('#exist-addr').hide();
     }
   }
  
  }


 async onClickSubmit(ele){
  let con = true;
  //this.submitfalse = false;

  let obj = {
    "titleId": ele.uniqueId,
    "ownerId": ele.userId,
    "reservePrice": ele.reservePrice,
    "country": ele.country,
    "area": ele.area,
    "postcode": ele.postcode,
    "eircode": ele.area,
    "streetaddress": ele.streetaddress ,
    "saletype": ele.saletype,
    "information": ele.information,
    "state": "FOR_SALE",
    "proptype": ele.proptype,
    "forSale": true,
    "offers": [],
    "created_date" : new Date().toString()
  }
 
  let obj1= {
    "id": this.agentservice.guid(),
    "land_id":ele.uniqueId,
    "auctionDate": ele.auctionDate,
    "auctionTime":ele.auctionTime,
    "tender_date": ele.tender_date,
    "bedrooms": ele.bedrooms,
    "bathroom": ele.bathroom,
    "overallFloor": ele.overallFloorlength +"*"+ele.overallFloorwidth,
    "tax": ele.tax
  }
 


  const res = await this.userService.addProperty(obj);
  const res1 = await this.userService.addPropertyDetails(obj1);
  
  for(var i=0;i<ele.facilities.length;i++)
  {
    let obj2= {
      "id": this.agentservice.guid(),
      "land_id": ele.uniqueId,
      "facility_id": ele.facilities[i]
    }
    const res2 = await this.userService.addPropertyFacilities(obj2);

  }

 
  if(res.status == 200){
    this.response_msg = 'Property Added Successfuly.';
    this.formfalse = false;
  }else{
    this.response_msg = 'Something Went Wrong.';
  }
  
    
  }


  async openOffer(prop){
    //debugger;
  console.log(prop);
  let bid_data = '';
  if(prop.offers.length>0){
    
    for(var i=0;i<prop.offers.length;i++)
    {
       
      let bid = prop.offers[i].bidPrice;
      let buy = prop.offers[i].person;
      let res = buy.split("#");
      let buyer = res[1];
      const rs = await this.userService.getBidderByID(buyer);
   
      let full = rs.firstName + " " + rs.lastName;
      console.log(rs);
      bid_data+= "<tr><td style='padding-right: 19px;padding-left: 12px;'>"+buyer+"</td><td style='padding-right: 19px;padding-left: 12px;'>"+full+"</td><td style='padding-right: 19px;padding-left: 12px;'>"+bid+"</td></tr>";
    }
      $('#tr_cont').html(bid_data);
      $('#offer-bid').show();
      $('#nobiddata').hide();
    
  }else{
    let nodata = "<h3 style='text-align:center'>No offer received yet</h3>";
    $('#nobiddata').html(nodata);
    $('#nobiddata').show();
    $('#offer-bid').hide();
  }
}

}
