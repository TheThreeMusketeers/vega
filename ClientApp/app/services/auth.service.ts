import { ToastyService } from 'ng2-toasty';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';


@Injectable()
export class AuthService {
    originUrl:string;
    NAME_KEY = 'name'
    TOKEN_KEY = 'token'

    constructor(private http:Http,
                private router:Router,
                private toasty:ToastyService, 
                @Inject('ORIGIN_URL') originUrl: string) {
        this.originUrl = originUrl;
     }

     get name(){
         return localStorage.getItem(this.NAME_KEY);
     }

     get token(){
        return localStorage.getItem(this.TOKEN_KEY);
     }

     get isAuthenticated(){
        //return false;
        return tokenNotExpired(this.TOKEN_KEY); 
        //return !!localStorage.getItem(this.TOKEN_KEY);
     }

     get tokenHeader(){
         var header = new Headers({'Authorization':'Bearer ' + this.token});
        
         return new RequestOptions({headers:header});
     }

     register(user){
         delete user.confirmPassword;
         return this.http.post(this.originUrl+'/auth/register',user)
            .subscribe(res => {
                this.authenticate(res);
            },
            err=>{
                this.toasty.error({
                    title:'Error',
                    msg: err.text(),
                    theme:'bootstrap',
                    showClose:true,
                    timeout:5000
                  });      
            });
     }

     login(loginData){
        return this.http.post(this.originUrl+'/auth/login',loginData)
        .subscribe(res => {
            this.authenticate(res);
        });
     }

     logout(){
         localStorage.removeItem(this.NAME_KEY);
         localStorage.removeItem(this.TOKEN_KEY);
     }

     authenticate(res){
        var authResponse = res.json();
        if(!authResponse.token)
            return;
        localStorage.setItem(this.TOKEN_KEY,authResponse.token);
        localStorage.setItem(this.NAME_KEY,authResponse.firstName);
        this.router.navigate(['/']);
     }
    
}//cs