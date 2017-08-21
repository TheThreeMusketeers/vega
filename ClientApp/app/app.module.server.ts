import { ToastyModule } from 'ng2-toasty';

import { VehicleService } from './services/vehicle.service';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        ServerModule,
        ToastyModule.forRoot(),
        ...sharedConfig.imports
    ],
    providers:[
        VehicleService
    ]
   
})
export class AppModule {
}
