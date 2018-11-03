/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  ,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as myGlobals from  '../../_services/globals';

@Injectable()
export class DataService {
    private resolveSuffix = '?resolve=true';
    private actionUrl: string;
    private headers: Headers;
    baseUrl:string = myGlobals.API_END_POINT;
    hyperUrl:string = myGlobals.HYPERLEDGER_API_END_POINT

    constructor(private http: Http) {
        this.actionUrl = '/api/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    get_all_users(){
        return this.http.get(this.baseUrl + 'allusers');
    }

    async getGroup() : Promise<any> {
       // debugger;
        const response = await this.http.get(this.hyperUrl + 'api/Group').toPromise();
        return response.json();
    }

    async getHypUsers() : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/Users').toPromise();
        return response.json();
    }

    async getHypBuyers() : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/queries/selectUserByUserType?user_type=1').toPromise();
        return response.json();
    }

    async getByGroupByID(id) : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/Group/'+ id).toPromise();
        return response.json();
    }

    async updateGroup(body) : Promise<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.put(this.hyperUrl +'api/Group/'+body.groupId, body , options).toPromise();
        return response.json();
    }

    async addGroup(body) : Promise<any>{
       // debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.post(this.hyperUrl +'api/Group/', body , options).toPromise();
        return response.json();   
    }

    async deleteGroupByID(obj) : Promise<any> {
        const response = await this.http.delete(this.hyperUrl + 'api/Group/'+ obj.groupId).toPromise();
        return response.json();
    }


    async addUser(body , num , type:number=1) : Promise<any>{ 
        
        let hyp_body = {
            "$class": "org.kindlebit.com.Users",
            "personId": num,
            "userName": body.username,
            "firstName": body.first_name,
            "lastName": body.last_name,
            "Email": body.email,
            "Password": body.password,
            'user_type':type,
            "profile_pic": "",
            "city": "",
            "state": "",
            "Address": "",
            "active": true,
            "created_date" : new Date().toString()  
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.post(this.hyperUrl +'api/Users', hyp_body , options).toPromise();
        return response.json();
    }

    async addUserGroup(num , grpid:string='') : Promise<any>{
        if(grpid == ''){
            grpid =  myGlobals.BUYER_GRP_ID
        }
        let hyp_body = {
            "$class": "org.kindlebit.com.UserGroup",
            "Id": this.guid(),
            "userId": num,
            "groupId":grpid,
            "created_date" : new Date()
          }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.post(this.hyperUrl +'api/UserGroup', hyp_body , options).toPromise();
        return response.json();
    }

    async updateMysqlUser(id) : Promise<any>{
        let res_body = {'id' : id , 'hyperledger' : 1}
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.put(this.baseUrl +'update', res_body , options).toPromise();
        return response.json();
    }

    async updateUser(body , active) : Promise<any>{ 
            let hyp_body = {
            "$class": "org.kindlebit.com.Users",
            "personId": body.personId,
            "userName": body.userName,
            "firstName": body.firstName,
            "lastName": body.lastName,
            "Email": body.Email,
            "Password": body.Password,
            'user_type':body.user_type,
            "profile_pic": "",
            "city": "",
            "state": "",
            "Address": "",
            "active": active,
            "created_date" : body.created_date  
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.put(this.hyperUrl +'api/Users/'+body.personId, hyp_body , options).toPromise();
        return response.json();
    }

    async addSeller(body) : Promise<any>{
        debugger;
        let hyp_body = {
            "$class": "org.kindlebit.com.Users",
            "personId": body.personId,
            "userName": body.userName,
            "firstName": body.firstName,
            "lastName": body.lastName,
            "Email": body.Email,
            "Password": body.Password,
            'user_type':body.user_type,
            "profile_pic": body.profile_pic,
            "city": body.city,
            "state": body.state,
            "Address": body.Address,
            "active": body.active,
            "created_date" : new Date().toString()  
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.post(this.hyperUrl +'api/Users', hyp_body , options).toPromise();
        return response.json();
    }


    async getHypAgents() : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/queries/selectUserWithBuyerGroup').toPromise();
        return response.json();
    }

    async getUserByType(utype) : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/queries/selectUserByUserType?user_type='+utype).toPromise();
        return response.json();
    }

    async getUserIsExist(username , email) : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/queries/selectUser?user='+ username +'&email='+ email).toPromise();
        return response.json();
    }


    async getUserValid(username , email) : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/queries/selectUserForLogin?user='+ username +'&email='+ email).toPromise();
        return response.json();
    }

    async getPropertyByUserId(id) : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/queries/selectPropertyByUserId?user=resource%3Aorg.kindlebit.com.Users%23'+id).toPromise();
        return response.json();
    }
    
    async getAllProperty() : Promise<any> {
        const response = await this.http.get(this.hyperUrl + 'api/LandTitle').toPromise();
        return response.json();
    }
    
  async getLand() : Promise<any> {
         //debugger;
         const response = await this.http.get(this.hyperUrl + 'api/LandTitle').toPromise();
         return response.json();
     }

     async getoffers() : Promise<any> {
        debugger;
        const response = await this.http.get(this.hyperUrl + 'api/Offer').toPromise();
        return response.json();
    } 


    async getHypUserById(id)  :Promise<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.http.get(this.hyperUrl +'api/Users/'+id , options).toPromise();
        return response.json();

    }

    async updateAgent(body) : Promise<any>{ 
        debugger;
        let hyp_body = {
        "$class": "org.kindlebit.com.Users",
        "personId": body.personId,
        "userName": body.username,
        "firstName": body.firstname,
        "lastName": body.lastname,
        "Email": body.email,
        "Password": body.opassword,
        'user_type':body.user_type,
        "profile_pic": body.profile_pic,
        "city": body.city,
        "state": body.state,
        "Address": body.address,
        "active": body.active,
        "created_date" : body.created_date  
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.hyperUrl +'api/Users/'+body.personId, hyp_body , options).toPromise().then(data => {
        return data;
    }).catch(this.handleError);

}

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
      private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    async addProperty(body) : Promise<any>{
        let property = {
            "$class": "org.kindlebit.com.LandTitle",
            "titleId": "string",
            "ownerId": {},
            "reservePrice": 0,
            "country": "string",
            "area": "string",
            "postcode": "string",
            "eircode": "string",
            "streetaddress": "string",
            "saletype": "For_Sale_by_Private_Treaty",
            "information": "string",
            "state": "FOR_SALE",
            "proptype": "Rental",
            "forSale": true,
            "offers": [],
            "created_date": "2018-07-20T05:40:26.482Z"
          }

          

    }

    async propAdditionaldata(){
        let propertyadditional = {
            "$class": "org.kindlebit.com.LandAdditionalDetails",
            "id": "string",
            "land_id": {},
            "auctionDate": "string",
            "auctionTime": "string",
            "tender_date": "string",
            "bedrooms": "string",
            "bathroom": "string",
            "overallFloor": "string",
            "tax": "string"
          }

    }

    
}
