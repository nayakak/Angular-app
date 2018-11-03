import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { debug } from 'util';

@Injectable()
export class AdminAuthGuard implements CanActivate,CanActivateChild{

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var auth = JSON.parse(localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser')  && auth.num == 1) {
            return true;
        }else if(localStorage.getItem('currentUser') && auth.num != 1){
            this.router.navigate(['/']);
            return false;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        var auth = JSON.parse(localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser')  && auth.num == 1) {
            return true;
        }else if(localStorage.getItem('currentUser') && auth.num != 1){
            this.router.navigate(['/']);
            return false;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }   

}