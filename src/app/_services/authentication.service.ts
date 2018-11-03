import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Http, Headers,Response ,RequestOptions } from '@angular/http';
import { DataService} from '../admin/adminservices/data.service';
import { Data } from '@angular/router';
import * as myGlobals from  './globals';
import * as md5 from "blueimp-md5/js/md5";


@Injectable()
export class AuthenticationService {
    constructor(private http: Http , private dataService : DataService) { }

   async login(username: string, password: string)  : Promise<any>{
        let Url =myGlobals.API_END_POINT+'login';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const response:any = await this.http.post(Url, {username : username , password :password } , options).toPromise();
         
        let reshyp:any = await this.http.get(myGlobals.HYPERLEDGER_API_END_POINT + 'api/queries/selectUserForLogin?user='+ response.json().username +'&email='+ response.json().email).toPromise();
    if(response.json().num == 1){
            localStorage.setItem('currentUser', JSON.stringify(response.json()));
            return response.json();
    }else{
        if(response.json().hyperledger == '0'){
            return {msg:'not exist'};
        }

        if(reshyp.json().length > 0 && reshyp.json()[0].active == false){
            return {active:false};
        }

        if(response.json().code == '204'){
            return response.json();
        }
         
        if(response.json().token && reshyp.json()[0].active == true){
            localStorage.setItem('currentUser', JSON.stringify(response.json()));
            localStorage.setItem('personID', JSON.stringify(reshyp.json()[0].personId));
            return response.json();
        }
    }
        
       
    }


    async agentlogin(username , password):Promise<any>{
        password = md5(password);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });   
        let reshyp:any = await this.http.get(myGlobals.HYPERLEDGER_API_END_POINT + 'api/queries/selectAgent?user='+username+'&password='+ password).toPromise();
            
        if(reshyp.json().length > 0 && reshyp.json()[0].active){
            localStorage.setItem('currentUser', JSON.stringify(reshyp.json()[0]));
            reshyp.json()[0]['message'] = 'ok';
            return {'resp':'succes' , 'message' : 'Successfully login'};
        }else{
            return {'resp':'error' , 'message' : 'Username & Password doesn\'t match.'};
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}