import { PaginationComponent } from './components/shared/pagination.component';
import { AppErrorHandler } from './components/app/app.error-handler';
import { ErrorHandler } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToastyModule} from 'ng2-toasty';
import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        PaginationComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicles/new', component:VehicleFormComponent},
            { path: 'vehicles/:id', component:VehicleFormComponent},
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        VehicleService,
        {provide:ErrorHandler,useClass:AppErrorHandler}
    ]
};
