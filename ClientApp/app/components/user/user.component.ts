import { ToastyService } from 'ng2-toasty';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    updateUserResource = {
        firstName: '',
        lastName:''
    }
    constructor(private userService:UserService,
                private toastyService:ToastyService) { }

    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            this.updateUserResource.firstName = user.firstName;
            this.updateUserResource.lastName = user.lastName;
        });
     }
    submit(){
        this.userService.updateUser(this.updateUserResource)
            .subscribe(user => {
                this.toastyService.success({
                    title:'Success',
                    msg:'The user was succesfully updated',
                    theme:'bootstrap',
                    showClose:true,
                    timeout:5000
                  });
            });
    }//submit

}