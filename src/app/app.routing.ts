import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { UserComponent } from './user';
import { RecordComponent} from './record';
import {RecordAddComponent} from './record_add'
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'record', component: RecordComponent, canActivate: [AuthGuard]},
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'record_add', component: RecordAddComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);