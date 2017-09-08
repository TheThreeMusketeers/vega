import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: any ={
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    };

    constructor(
        private route:ActivatedRoute,
        private router:Router,
        private authService:AuthService,
        private toastyService:ToastyService) { 
          
        }

    ngOnInit(){}
    submit(){
        var result$ = this.authService.register(this.user);
        result$.subscribe(user=>{
          this.toastyService.success({
            title:'Success',
            msg:'The user was succesfully registered',
            theme:'bootstrap',
            showClose:true,
            timeout:5000
          });
          
        });
    }//submit
}//cs