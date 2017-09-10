import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { BrowserXhr } from '@angular/http';
import { ChartModule } from 'angular2-chartjs';

import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { PaginationComponent } from './components/shared/pagination.component';

import { AppErrorHandler } from './components/app/app.error-handler';
import { ErrorHandler } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToastyModule} from 'ng2-toasty';
import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        RegisterComponent,
        LoginComponent,
        UserComponent
    ],
    imports: [
        FormsModule,
        ChartModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component:VehicleFormComponent},
            { path: 'vehicles/edit/:id',component:VehicleFormComponent},
            { path: 'vehicles/:id', component:ViewVehicleComponent},
            { path: 'vehicles', component:VehicleListComponent},
            { path: 'register', component:RegisterComponent},
            { path: 'login', component:LoginComponent},
            { path: 'user', component:UserComponent},
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers:[
        VehicleService,
        PhotoService,
        ProgressService,
        AuthService,
        UserService,
        {provide:ErrorHandler,useClass:AppErrorHandler},
        {provide:BrowserXhr,useClass:BrowserXhrWithProgress}
    ]
};
