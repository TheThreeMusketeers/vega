import { Injectable,Inject } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class VehicleService {
  originUrl:string;
  constructor(private http:Http, @Inject('ORIGIN_URL') originUrl: string) { 
    this.originUrl=originUrl;
  }

  getMakes(){
    //console.log(this.originUrl);
    return this.http.get(this.originUrl +'/api/makes')
      .map(res=>res.json());
      
  }

  getFeatures(){
    return this.http.get(this.originUrl +'/api/features')
      .map(res=>res.json());
      
  }//getFeatures

  create(vehicle){
      return this.http.post(this.originUrl +'/api/vehicles',vehicle)
        .map(res=>res.json());
  }//create

}
