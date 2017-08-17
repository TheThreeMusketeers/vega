import { Injectable,Inject } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class MakeService {
  originUrl:string;
  constructor(private http:Http, @Inject('ORIGIN_URL') originUrl: string) { 
    this.originUrl=originUrl;
  }

  getMakes(){
    console.log(this.originUrl);
    return this.http.get(this.originUrl +'/api/makes')
      .map(res=>res.json());
      
  }

}
