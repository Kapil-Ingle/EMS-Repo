import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', loadComponent: () => import('./components/user/login/login.component').then((c)=> c.LoginComponent)},
    {path: 'forgot-password', loadComponent: () => import('./components/user/forgot-password/forgot-password.component').then((c)=> c.ForgotPasswordComponent)},
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: 'dashboard', loadComponent: () => import('./components/pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)},
            {path: 'employee-management', loadComponent: () => import('./components/pages/employee-management/employee-management.component').then((c) => c.EmployeeManagementComponent)},
            {path: 'leave-management', loadComponent: () => import('./components/pages/leave-management/leave-management.component').then((c) => c.LeaveManagementComponent)},
            {path: 'sales', loadComponent: () => import('./components/pages/sales/sales.component').then((c) => c.SalesComponent)},
            {path: 'payroll', loadComponent: () => import('./components/pages/payroll/payroll.component').then((c) => c.PayrollComponent)},
            {path: 'reports', loadComponent: () => import('./components/pages/reports/reports.component').then((c) => c.ReportsComponent)},
        ]
    }
];
