import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Record} from '../_models'
import { AlertService, RecordService, AuthenticationService } from '@/_services';
import {DatePipe} from '@angular/common'
//moment
@Component({
    templateUrl: 'record_detail.component.html',
    styleUrls: ['record_detail.component.css'],
})
export class RecordDetailComponent implements OnInit {
    updateRecordForm: FormGroup;
    loading = false;
    submitted = false;
    recordId: number;
    currentRecord: Record = {
        distance: "",
        date: "",
        time: "",
        id: -1,
    };
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private recordService: RecordService,
        private alertService: AlertService,
        private datePipe: DatePipe,
        private activatedRoute: ActivatedRoute,
        ) { 
        // redirect to home if already logged in
            let id = this.activatedRoute.snapshot.paramMap.get('id');
            if(id) {
                this.recordId = parseInt(id);
                this.recordService.getById(this.recordId).pipe(first()).subscribe(
                    record => {
                        this.currentRecord = record;
                        this.updateRecordForm = this.formBuilder.group({
                            distance: [this.currentRecord.distance, Validators.required],
                            time: [this.currentRecord.time, Validators.required],
                            date: [this.currentRecord.date, Validators.required],
                        });
                    }
                )
            }
            else {
                this.recordId = -1;
            }
        }

    ngOnInit() {
        this.updateRecordForm = this.formBuilder.group({
            distance: [this.currentRecord.distance, Validators.required],
            time: [this.currentRecord.time, Validators.required],
            date: [this.currentRecord.date, Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { 
        return this.updateRecordForm.controls; }

    onSubmit() {
         this.submitted = true;

        // stop here if form is invalid
        if (this.updateRecordForm.invalid) {
            return;
        }

        this.loading = true;
        let record:{date: string,} = this.updateRecordForm.value;
        record.date = this.datePipe.transform(record.date, "yyyy-MM-dd");
        this.recordService.add(this.updateRecordForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Add Record Successful', true);
                    this.router.navigate(['/records']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        alert("123");
    }
}
