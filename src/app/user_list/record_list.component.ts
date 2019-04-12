import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Record, User, WeeklyData} from '@/_models';
import { UserService, AuthenticationService, RecordService, AlertService} from '@/_services';
import {Router} from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {DatePipe} from '@angular/common'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({ 
    templateUrl: 'record_list.component.html', 
    styleUrls: ['record_list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    displayedColumns:string[] = ["id", "username", "first_name", "last_name", "update", "delete"];
    filterForm: FormGroup;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private recordService: RecordService,
        private router: Router,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private alertService: AlertService,
        private dialog: MatDialog,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
        this.filterForm = this.formBuilder.group({
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required]
        })
    }
    get f() {
        console.log(this.filterForm.controls)
        return this.filterForm.controls;
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    deleteRecord(id:number) {
        this.userService.delete(id).pipe(first()).subscribe();
        this.loadAllUsers();
    }
    updateRecord(id:number) {
        this.router.navigate(['records/one/', id])
    }
    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => {
    //         this.loadAllUsers()
    //     });
    // }
    addRecord() {
        this.router.navigate(['records/add'])
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
