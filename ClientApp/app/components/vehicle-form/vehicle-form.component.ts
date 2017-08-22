
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes:any[];
  models:any[];
  features:any[];
  vehicle: any = {
    features : [],
    contact : {}
  };
  constructor(private vehicleService:VehicleService,
              private toastyService:ToastyService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes=>{
      this.makes=makes;
      //console.log("MAKES",this.makes);
    });

    this.vehicleService.getFeatures().subscribe(features=>{
      this.features=features;
      //console.log("FEATURES",this.features);
    });

  }//ngOnInit

  onMakeChange(){
    var selectedMake = this.makes.find(m=>m.id==this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models:[];
    delete this.vehicle.modelId;
    //console.log("VEHICLE",this.vehicle);
  }//onMakeChage

  onFeatureToggle(featureId,$event){
    if($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index,1);
    }
  }//onFeatureToggle

  submit(){
      console.log("geliyor..");
      this.vehicleService.create(this.vehicle)
        .subscribe(
          x=>console.log("LOG-CREATE-VEHICLE",x)
        );
  }//submit

}
