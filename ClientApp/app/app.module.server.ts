import { PhotoService } from './services/photo.service';
import { AppErrorHandler } from './components/app/app.error-handler';
import { ErrorHandler } from '@angular/core';
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
        {provide:ErrorHandler,useClass:AppErrorHandler},
        VehicleService,
        PhotoService
    ]
   
})
export class AppModule {
}
