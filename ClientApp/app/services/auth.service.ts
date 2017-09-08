import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AuthService {
    originUrl:string;

    constructor(private http:Http, @Inject('ORIGIN_URL') originUrl: string) {
        this.originUrl = originUrl;
     }

     register(user){
         return this.http.post(this.originUrl+'auth/register',user)
            .map(res => res.json());
     }
    
}//cs