
import { Routes } from '@angular/router';
import { AllReportsComponent } from './all-reports/all-reports.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ReportsComponent } from './reports.component';
import { reportResolver } from '@/app/core/resolvers/reports.resolver';


export const reportsRoutes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            {
                path: 'all',
                component: AllReportsComponent,
            },
            {
                path: ':id',
                component: ReportDetailsComponent,
                resolve: { report: reportResolver }
            }
        ]
    }
];
