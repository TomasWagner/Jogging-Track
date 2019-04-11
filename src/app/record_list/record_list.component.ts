import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Record, User} from '@/_models';
import { UserService, AuthenticationService, RecordService} from '@/_services';
import {Router} from '@angular/router';

@Component({ 
    templateUrl: 'record_list.component.html', 
    styleUrls: ['record_list.component.css'],
})
export class RecordListComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    records: Record[] = [];
    displayedColumns:string[] = ["id", "user", "date", "distance", "time", "update", "delete"]
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private recordService: RecordService,
        private router: Router,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllRecords();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    deleteRecord(id:number) {
        this.recordService.delete(id).pipe(first()).subscribe();
        this.loadAllRecords();
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
    private loadAllRecords() {
        this.recordService.getAll().pipe(first()).subscribe(records => {
            this.records = records;
        });
    }
}