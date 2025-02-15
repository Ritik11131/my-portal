
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { ReportsComponent } from './reports/reports.component';
import { RawDataComponent } from './raw-data/raw-data.component';

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'management',
                loadChildren: () => import('./management/management.routes').then(m => m.managementRoutes)
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.routes').then(m => m.reportsRoutes)
            },
            {
                path: 'raw-data',
                component: RawDataComponent
            },
        ]
    }
];
