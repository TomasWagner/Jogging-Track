import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ 
    selector: 'app', 
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'] ,
})
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    IsAdminorUser() {
        if(this.currentUser!= undefined) {
            this.currentUser.role == "Admin" || this.currentUser.role == "User"
        }
        return false;
    }
    IsAdminorManager() {
        if(this.currentUser) {
            this.currentUser.role == "Admin" || this.currentUser.role == "Manager"
        }
        return false;
    }
}