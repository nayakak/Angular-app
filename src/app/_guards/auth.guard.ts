import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
        var auth = JSON.parse(localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser') && typeof auth.num != 'undefined' && auth.num != 1) {
            return true;
        }else if(localStorage.getItem('currentUser') && typeof auth.num != 'undefined' && auth.num == 1){
            this.router.navigate(['/admin']); 
            return false;
        }else if(localStorage.getItem('currentUser') && auth.user_type == 2){
            this.router.navigate(['/agent']); 
            return false;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

}