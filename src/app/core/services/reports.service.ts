import { REPORTS } from '@/app/shared/constants/reports';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    private reports = REPORTS;

    getReports() {
        return this.reports;
    }

    getReportById(id: string) {
        return this.reports.find(report => report.id === id);
    }
}
