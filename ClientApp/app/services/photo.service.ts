import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class PhotoService {
    originUrl:string;

    constructor(private http:Http, @Inject('ORIGIN_URL') originUrl: string) {
        this.originUrl = originUrl;
     }
    upload(vehicleId,photo){
        var formData = new FormData();
        formData.append('file',photo);

        return this.http.post(this.originUrl +'/api/vehicles/'+vehicleId+'/photos',formData)
        .map(res=>res.json());
    }
}//cs