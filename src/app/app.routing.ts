import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { UserComponent } from './user';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { RecordListComponent } from './record_list';
import { RecordDetailComponent } from './record_detail';
import { UserListComponent } from './user_list';
import { UserDetailComponent } from './user_detail';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'records', component: RecordListComponent, canActivate: [AuthGuard]},
    
    { path: 'records/one/:id', component: RecordDetailComponent, canActivate: [AuthGuard]},
    { path: 'records/add', component: RecordDetailComponent, canActivate: [AuthGuard]},

    { path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
    { path: 'users/one/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
    { path: 'users/add', component: UserDetailComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);