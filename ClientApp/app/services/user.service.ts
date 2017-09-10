import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    originUrl:string;
    constructor(private http:Http,
                private router:Router,
                private auth:AuthService, 
                @Inject('ORIGIN_URL') originUrl: string) {
        this.originUrl = originUrl;
     }//constructor

     getUser(){
         return this.http.get(this.originUrl+'/api/users/me',this.auth.tokenHeader)
            .map(user => user.json());
     }

}//cs