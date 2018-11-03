import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http ,RequestOptions, Headers} from '@angular/http';
import * as myGlobals from  './globals';
import { User } from '../_models';

@Injectable()
export class UserService { 
    constructor(private http: HttpClient , private $http: Http) { }
    baseUrl:string = myGlobals.API_END_POINT;
    hyperUrl:string = myGlobals.HYPERLEDGER_API_END_POINT

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        return this.http.post('/api/users', user);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
    deleteLandTitle(id: number) {
        return this.http.delete('/api/LandTitle/' + id);
    }


    async getBidderByID(obj) : Promise<any> {
        // debugger;
         let response = await this.http.get(this.hyperUrl + 'api/users/'+obj).toPromise();
         return response;
     }

    async deletePropByID(obj) : Promise<any> {
       // debugger;
        const response = await this.http.delete(this.hyperUrl + 'api/LandTitle/'+ obj).toPromise();
        return response;
    }
    async getByGroupByID() : Promise<any> {
        const response = await this.$http.get(this.hyperUrl + 'api/Group/bd372831-a633-90df-894d-21c8d6e1c195').toPromise();
        return response.json();
    }

    async addUser(user : User) : Promise<any>{
        let newUser = user;
        let rest_body = {username : newUser.username , first_name : newUser.firstName , last_name : newUser.lastName , password : newUser.password , email : newUser.email , buyer_id : myGlobals.BUYER_GRP_ID};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.$http.post(this.baseUrl +'register', rest_body , options).toPromise();
        return response.json();
    }

    async addAgent(user) : Promise<any>{
        let newUser = user;
        let rest_body = {username : newUser.username , first_name : newUser.first_name , last_name : newUser.last_name , password : newUser.password , email : newUser.email , buyer_id : myGlobals.AGENT_GRP_ID};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.$http.post(this.baseUrl +'register', rest_body , options).toPromise();
        return response.json();
    }

    async addProperty(data) : Promise<any>{
       // debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.$http.post(this.hyperUrl +'api/LandTitle', data , options).toPromise();
        return response;
    }

    async addPropertyDetails(data) : Promise<any>{
      //  debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.$http.post(this.hyperUrl +'api/LandAdditionalDetails', data , options).toPromise();
        return response.json();
    }

    async addPropertyFacilities(data) : Promise<any>{
      //  debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.$http.post(this.hyperUrl +'api/LandFacilities', data , options).toPromise();
        return response.json();
    }

    async addOffer(bidValue,persnID,propId,CurrentDate) : Promise<any>{

        let rest_body = {bidPrice : bidValue , listing : propId , person : persnID , created_date : CurrentDate , timestamp : CurrentDate};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response = await this.$http.post(this.hyperUrl +'api/offer', rest_body , options).toPromise();
        return response.json();
    }


}