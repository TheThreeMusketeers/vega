import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginData = {
        email: '',
        password:''
    }
    constructor(private auth:AuthService) { }

    ngOnInit() { }

    submit(){
        this.auth.login(this.loginData);
    }
}