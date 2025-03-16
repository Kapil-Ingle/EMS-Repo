import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', loadComponent: () => import('./components/user/login/login.component').then((c)=> c.LoginComponent)},
    {path: 'forgot-password', loadComponent: () => import('./components/user/forgot-password/forgot-password.component').then((c)=> c.ForgotPasswordComponent)}
];
