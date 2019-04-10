import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Record } from '@/_models';

@Injectable({ providedIn: 'root' })
export class RecordService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Record[]>(`${config.apiUrl}/records/`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/records/${id}`);
    }

    update(user: Record) {
        return this.http.put(`${config.apiUrl}/records/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/records/${id}`);
    }
}