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
export class RecordListComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    records: Record[] = [];
    displayedColumns:string[] = ["id", "user", "date", "distance", "time", "update", "delete"];
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
        this.loadAllRecords();
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

    showWeeklyReport(): void {
        this.recordService.getWeeklyData().subscribe(
            data => {
                const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                    width: '800px',
                    data: data,
                  });
              
                  dialogRef.afterClosed().subscribe(result => {
                  });
            }
        )
      }

    onSubmit() {

       // stop here if form is invalid
       if (this.filterForm.invalid) {
           return;
       }


       let filterData: {fromDate: string, toDate: string} = this.filterForm.value;
       filterData.fromDate = this.datePipe.transform(filterData.fromDate, "yyyy-MM-dd")
       filterData.toDate = this.datePipe.transform(filterData.toDate, "yyyy-MM-dd")
       
       this.recordService.filter(filterData)
           .pipe(first())
           .subscribe(
               data => {
                   this.records = data;
               },
               error => {
                   this.alertService.error(error);
               });
   }
    private loadAllRecords() {
        this.recordService.getAll().pipe(first()).subscribe(records => {
            this.records = records;
        });
    }
}

@Component({
    selector: 'weekly_report-dialog',
    templateUrl: 'weekly_report-dialog.html',
    styleUrls: ['record_list.component.css']
  })
  export class DialogOverviewExampleDialog {
    
    displayedColumns:string[] = ["index", "year", "week", "totalTime", "totalDistance", 'avgSpeed'];
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: WeeklyData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }