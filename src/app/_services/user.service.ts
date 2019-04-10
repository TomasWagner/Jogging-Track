import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users/`);
    }

    getByToken(token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          });
        return this.http.get(`${config.apiUrl}/auth-verify`, {headers:headers})
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        console.log(this.http)
        return this.http.post(`${config.apiUrl}/signup/`, user);
    }

    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}