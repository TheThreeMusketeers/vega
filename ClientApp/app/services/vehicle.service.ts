import { SaveVehicle } from './../models/vehicle';
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

  update(vehicle:SaveVehicle){
    return this.http.put(this.originUrl +'/api/vehicles/'+vehicle.id,vehicle)
      .map(res=>res.json());
}//update

  getVehicle(id){
    return this.http.get(this.originUrl +'/api/vehicles/' + id)
      .map(res=>res.json());
      
  }//getVehicle

  getQueryString(obj){
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if(value!=null && value!=undefined)
        parts.push(encodeURIComponent(property)+'='+encodeURIComponent(value));
    }

    return parts.join('&');

  }

  getVehicles(filter){
    return this.http.get(this.originUrl +'/api/vehicles?'+this.getQueryString(filter))
      .map(res=>res.json());
      
  }//getVehicles

  delete(id){
    return this.http.delete(this.originUrl +'/api/vehicles/' + id)
    .map(res=>res.json());
  }//delete

}
