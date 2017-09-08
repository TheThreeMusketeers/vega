import { AuthService } from './services/auth.service';
import { ErrorHandler } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { BrowserXhr } from '@angular/http';

import { VehicleService } from './services/vehicle.service';
import { PhotoService } from "./services/photo.service";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { AppErrorHandler } from "./components/app/app.error-handler";


@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ToastyModule.forRoot(),
        ...sharedConfig.imports
    ],
    providers: [
        VehicleService,
        PhotoService,
        ProgressService,
        AuthService,
        {provide:ErrorHandler,useClass:AppErrorHandler},
        {provide:BrowserXhr,useClass:BrowserXhrWithProgress},
        { provide: 'ORIGIN_URL', useValue: location.origin }
    ]
})
export class AppModule {
}
