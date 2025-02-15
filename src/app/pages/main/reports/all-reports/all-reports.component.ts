import { BadgeModule } from 'primeng/badge';
import { REPORTS } from '@/app/shared/constants/reports';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-all-reports',
  imports: [CommonModule, ButtonModule, BadgeModule],
  templateUrl: './all-reports.component.html',
  styleUrl: './all-reports.component.css'
})
export class AllReportsComponent {

  reports = REPORTS;

  constructor(private router:Router) {}

  handleDynamicReport(report:any) {
    this.router.navigate(['/main/reports', report.id]);
  }

}
