import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';


@Injectable()
export class AuthService {
    originUrl:string;
    NAME_KEY = 'name'
    TOKEN_KEY = 'token'

    constructor(private http:Http,private router:Router, @Inject('ORIGIN_URL') originUrl: string) {
        this.originUrl = originUrl;
     }

     get name(){
         return localStorage.getItem(this.NAME_KEY);
     }

     get isAuthenticated(){
        //return false;
        return tokenNotExpired(this.TOKEN_KEY); 
        //return !!localStorage.getItem(this.TOKEN_KEY);
     }

     register(user){
         delete user.confirmPassword;
         return this.http.post(this.originUrl+'/auth/register',user)
            .subscribe(res => {
                var authResponse = res.json();
                if(!authResponse.token)
                    return;
                localStorage.setItem(this.TOKEN_KEY,authResponse.token);
                localStorage.setItem(this.NAME_KEY,authResponse.firstName);
                this.router.navigate(['/']);
            });
     }

     logout(){
         localStorage.removeItem(this.NAME_KEY);
         localStorage.removeItem(this.TOKEN_KEY);
     }
    
}//cs