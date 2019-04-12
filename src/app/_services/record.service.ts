import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Record, Filter, WeeklyData} from '@/_models';
@Injectable({ providedIn: 'root' })
export class RecordService {
    fromDate: string;
    toDate: string;
    constructor(private http: HttpClient) { }

    add(record: Record) {
        return this.http.post(`${config.apiUrl}/records/`, record);
    }

    filter(filter: Filter) {
        return this.http.get<Record[]>(`${config.apiUrl}/records/?fromDate=${filter.fromDate}&toDate=${filter.toDate}`);
    }

    getWeeklyData() {
        return this.http.get<WeeklyData[]>(`${config.apiUrl}/records/get_weeklydata/`);
    }

    getAll() {
        return this.http.get<Record[]>(`${config.apiUrl}/records/`);
    }

    getById(id: number) {
        return this.http.get<Record>(`${config.apiUrl}/records/${id}/`);
    }

    update(user: Record) {
        return this.http.put(`${config.apiUrl}/records/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/records/${id}/`);
    }
}